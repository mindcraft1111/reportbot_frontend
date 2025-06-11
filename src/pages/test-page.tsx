import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Play,
  X,
  RefreshCcw,
  Bookmark,
  Bot,
  Trash2,
} from "lucide-react";

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.withCredentials = true;

interface Prompt {
  id: string;
  template: string;
  section_id: string;
  name: string;
  prompt_text: string;
  created_at: string;
}

export default function PromptTestPage() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [responses, setResponses] = useState<Record<string, any[]>>({});
  const [editing, setEditing] = useState<string | null>(null);
  const [newPrompt, setNewPrompt] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);
  let responseIdCounter = 0;

  useEffect(() => {
    axios
      .get<Prompt[]>("/prompts-test/prompts/")
      .then((res) => setPrompts(res.data))
      .catch((err) => console.error("프롬프트 불러오기 실패", err));
  }, []);

  const handleTest = async (id: string, text: string) => {
    try {
      const res = await axios.post("/prompts-test/analyze/", {
        input_prompt: text,
      });

      const newResp = {
        responseId: responseIdCounter++,
        content: res.data.result,
        saved: false,
        input: text,
      };

      setResponses((prev) => {
        const updated = { ...prev, [id]: [...(prev[id] || []), newResp] };
        setTimeout(() => {
          scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
        }, 100);
        return updated;
      });
    } catch (error: unknown) {
      let errMsg = "예상치 못한 오류";
      if (axios.isAxiosError(error)) {
        errMsg = error.response?.data?.error || error.message;
      } else if (error instanceof Error) {
        errMsg = error.message;
      }

      const newResp = {
        responseId: responseIdCounter++,
        content: `[에러] ${errMsg}`,
        saved: false,
        input: text,
      };

      setResponses((prev) => {
        const updated = { ...prev, [id]: [...(prev[id] || []), newResp] };
        setTimeout(() => {
          scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
        }, 100);
        return updated;
      });
    }
  };

  const handleEdit = async (id: string, newText: string) => {
    try {
      await axios.patch(`/prompts-test/prompts/${id}/`, { prompt_text: newText });
      setPrompts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, prompt_text: newText } : p))
      );
      setEditing(null);
    } catch (error) {
      console.error("프롬프트 수정 실패", error);
    }
  };

  const handleAddPrompt = async () => {
    if (!newPrompt.trim()) return;
    try {
      const res = await axios.post("/prompts-test/prompts/", {
        template: prompts[0]?.template,
        section_id: `manual_${Date.now()}`,
        name: `수동입력 ${prompts.length + 1}`,
        prompt_text: newPrompt,
      });
      setPrompts((prev) => [...prev, res.data]);
      setNewPrompt("");
    } catch (error) {
      console.error("프롬프트 추가 실패", error);
    }
  };

  const handleSave = async (promptId: string, response: any) => {
    await axios.post("/prompts-test/responses/", {
      prompt: promptId,
      content: response.content,
    });

    setResponses((prev) => ({
      ...prev,
      [promptId]: prev[promptId].map((r) =>
        r.responseId === response.responseId ? { ...r, saved: true } : r
      ),
    }));
  };

  const handleDelete = (promptId: string, responseId: number) => {
    setResponses((prev) => {
      const updated = { ...prev };
      updated[promptId] = updated[promptId].filter((r) => r.responseId !== responseId);
      return updated;
    });
  };

  return (
    <div className="flex h-screen p-6 gap-6 bg-gray-100 font-sans overflow-hidden">
      <div className="w-3/5 overflow-auto space-y-4">
        <h2 className="text-xl font-semibold text-blue-700">🧠 프롬프트 리스트</h2>
        <div className="bg-white shadow rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-blue-100 text-gray-700 text-left">
              <tr>
                <th className="p-3 border-r">프롬프트명</th>
                <th className="p-3 border-r">텍스트</th>
                <th className="p-3 text-center">동작</th>
              </tr>
            </thead>
            <tbody>
              {prompts.map((p) => (
                <tr key={p.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 border-r font-medium text-blue-600">{p.name}</td>
                  <td className="p-3 border-r">
                    {editing === p.id ? (
                      <textarea
                        className="w-full border p-2 rounded"
                        defaultValue={p.prompt_text}
                        onBlur={(e) => handleEdit(p.id, e.target.value)}
                        autoFocus
                      />
                    ) : (
                      <span>{p.prompt_text}</span>
                    )}
                  </td>
                  <td className="p-3 text-center space-y-1">
                    <button
                      onClick={() => handleTest(p.id, p.prompt_text)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
                    >
                      <Play className="w-4 h-4" /> 테스트
                    </button>
                    <button
                      onClick={() => setEditing(p.id)}
                      className="ml-2 px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
                    >
                      수정
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td className="p-3 text-gray-500 font-medium">새 프롬프트</td>
                <td className="p-3">
                  <textarea
                    className="w-full border px-3 py-2 rounded"
                    placeholder="프롬프트 텍스트 입력"
                    value={newPrompt}
                    onChange={(e) => setNewPrompt(e.target.value)}
                  />
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={handleAddPrompt}
                    className="px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
                  >
                    추가
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="w-2/5 bg-white rounded-xl border border-gray-200 shadow p-4 flex flex-col">
        <h2 className="text-lg font-semibold text-purple-600 flex items-center gap-2">
          <Bot className="w-5 h-5" /> 테스트 결과
        </h2>
        <div className="flex justify-end mt-2">
          <button
            onClick={() => setResponses({})}
            className="text-xs text-red-600 hover:underline cursor-pointer flex items-center gap-1"
          >
            <Trash2 className="w-4 h-4" /> 전체 테스트 결과 삭제
          </button>
        </div>
        <div ref={scrollRef} className="mt-4 space-y-4 overflow-y-auto flex-1 bg-gray-50 rounded p-3">
          {Object.entries(responses).flatMap(([promptId, list]) => (
            <div key={promptId} className="relative">
              {list.map((resp) => (
                <div key={resp.responseId} className="space-y-2 border-t border-gray-300 pt-3">
                  <div className="flex justify-end items-start">
                    <div className="bg-white border border-gray-300 rounded-lg p-3 text-sm max-w-xs">
                      <div className="font-semibold text-right mb-1">🙋 사용자</div>
                      <div className="whitespace-pre-wrap text-gray-800">{resp.input}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="bg-blue-100 border border-blue-200 rounded-lg p-3 text-sm max-w-xs">
                      <div className="font-semibold mb-1">🤖 챗봇</div>
                      <div className="whitespace-pre-wrap text-gray-800">{resp.content}</div>
                    </div>
                    <button
                      onClick={() => handleDelete(promptId, resp.responseId)}
                      className="text-gray-300 hover:text-red-500 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex gap-2 ml-1">
                    <button
                      onClick={() => handleTest(promptId, prompts.find((p) => p.id === promptId)?.prompt_text || "")}
                      className="text-xs text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <RefreshCcw className="w-3 h-3" /> 다시 요청
                    </button>
                    <button
                      onClick={() => handleSave(promptId, resp)}
                      disabled={resp.saved}
                      className={`text-xs flex items-center gap-1 px-2 py-1 rounded cursor-pointer ${
                        resp.saved
                          ? "bg-gray-100 text-gray-400 cursor-default"
                          : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                      }`}
                    >
                      <Bookmark className="w-3 h-3" />
                      {resp.saved ? "저장됨" : "히스토리 저장"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

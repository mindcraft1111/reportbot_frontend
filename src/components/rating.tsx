type RatingProps = {
  value: number; // e.g. 4.2
  outOf?: number; // default is 5
};

export default function Rating({ value, outOf = 5 }: RatingProps) {
  const filledStars = Math.floor(value);
  const hasHalfStar = value - filledStars >= 0.5;
  const emptyStars = outOf - filledStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1 text-yellow-500">
      {Array(filledStars)
        .fill(null)
        .map((_, i) => (
          <span key={`full-${i}`}>&#9733;</span> // ★
        ))}
      {hasHalfStar && <span>&#189;</span>} {/* ½ symbol */}
      {Array(emptyStars)
        .fill(null)
        .map((_, i) => (
          <span key={`empty-${i}`} className="text-gray-300">
            &#9733;
          </span>
        ))}
    </div>
  );
}

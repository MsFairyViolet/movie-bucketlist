export default function ColorPalette() {
    const colors = [
        "bright-red-orange", "vivid-orange", "bright-yellow", "vivid-green",
        "electric-cyan", "vibrant-blue", "strong-purple", "deep-magenta",
        "warm-coral", "rich-indigo", "teal", "lime-green"
    ];

    return (
        <div className="color-palette">
            {colors.map((color, index) => (
                <div key={index} className={`card ${color}`}></div>
            ))}
        </div>
    );
}
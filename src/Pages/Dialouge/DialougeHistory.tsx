
// A custom SVG icon component to closely match the image.
const EmptyStateIcon = () => {
    return (
        <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="0.75">
                {/* The top/lid part of the tray */}
                <path d="M6 9 L9 5 L15 5 L18 9 Z" />
                {/* The bottom/main part of the tray */}
                <path d="M4 19 L6 9 L18 9 L20 19 Z" />
            </g>
        </svg>
    );
};


const DialougeHistory = () => {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-50">
            <EmptyStateIcon />
            <p className="mt-4 text-sm text-gray-500">
                No dialogue record
            </p>
        </div>
    );
};

export default DialougeHistory;
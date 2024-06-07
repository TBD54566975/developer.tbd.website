const ProgressBar = ({ value, max }) => {
    const width = Math.max((value / max) * 100, 10);  // Ensure a minimum width percentage

    return (
        <div className="w-full bg-gray-200 rounded-full h-6 relative dark:bg-gray-700" style={{ padding: '2px', height: '24px', backgroundColor: '#D1D5DB' }}> 
            {/* Outer container with explicit background and height */}
            <div style={{
                width: `${width}%`, 
                height: '100%', 
                backgroundColor: '#27b5bf', 
                borderRadius: '9999px'  // Ensuring rounded corners
            }}>
                {/* Colored fill with explicit background color */}
            </div>
            <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center" style={{ color: 'black', fontSize: '1rem' }}> 
                {/* Centered text with explicit color and size changed to black */}
                {value} / {max}
            </div>
        </div>
    );
};



export default ProgressBar; 
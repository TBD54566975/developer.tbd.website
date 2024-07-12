const ProgressBar = ({ value, max }) => {
    const width = Math.min((value / max) * 100, 100); 
  
    return (
      <div className="w-full bg-gray-200 rounded-full h-6 relative dark:bg-gray-700" style={{ padding: '2px', height: '24px', backgroundColor: '#D1D5DB' }}>
        <div style={{
          width: `${width}%`,
          height: '100%',
          backgroundColor: '#27b5bf',
          borderRadius: '9999px'
        }}>
        </div>
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center" style={{ color: 'black', fontSize: '1rem' }}>
          {value} / {max}
        </div>
      </div>
    );
  };
  
  export default ProgressBar;
  
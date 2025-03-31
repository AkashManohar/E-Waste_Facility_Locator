export function Button({ children, className, onClick }) {
    return (
      <button className={`p-2 rounded-lg text-white ${className}`} onClick={onClick}>
        {children}
      </button>
    );
  }
  export function Button({ children, onClick, className = "" }) {
    return (
      <button
        onClick={onClick}
        className={`px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition ${className}`}
      >
        {children}
      </button>
    );
  }
  
  
export function Card({ children, className }) {
    return <div className={`p-6 bg-white shadow-lg rounded-2xl ${className}`}>{children}</div>;
  }
  
  export function CardContent({ children }) {
    return <div>{children}</div>;
  }
  
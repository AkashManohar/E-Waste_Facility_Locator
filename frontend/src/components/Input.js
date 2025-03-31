export function Input({ type = "text", placeholder, className, value, onChange }) {
    return (
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full p-2 border rounded-lg ${className}`}
        value={value}
        onChange={onChange}
      />
    );
  }
  
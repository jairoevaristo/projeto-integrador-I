interface SpinnerLoadingProps {
    size?: "SMALL" | "MEDIUM" | "LARGE";
    color?: string;
  }
  
  export const SpinnerLoading: React.FC<SpinnerLoadingProps> = ({
    color,
    size = "SMALL",
  }) => {
    const sizeSpinner = {
      SMALL: "w-6 h-6",
      MEDIUM: "w-10 h-10",
      LARGE: "w-16 h-16",
    };
  
    return (
      <div
        style={{ borderTopColor: "transparent" }}
        className={`${sizeSpinner[size]} border-2 border-${color} border-solid rounded-full animate-spin`}
      />
    );
  };
type ErrorNoticeProps = {
  message: string;
  className?: string;
};

export function ErrorNotice({ message, className = '' }: ErrorNoticeProps) {
  return (
    <div className={`card-soft border border-red-300 bg-red-50 p-4 ${className}`}>
      <p className="text-sm text-red-700">{message}</p>
    </div>
  );
}

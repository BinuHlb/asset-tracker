import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils"; // optional, if you already use cn()

interface DatePickerProps {
  value?: string;
  onChange: (value: string | undefined) => void;
  placeholder?: string;
}

function DatePicker({ value, onChange, placeholder = "Pick a date" }: DatePickerProps) {
  const date = value ? new Date(value) : undefined;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "glass border-slate-700 flex items-center justify-between px-3 py-2 rounded-md w-full text-left focus:border-cyan-500",
            !date && "text-slate-400"
          )}
        >
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
          <CalendarIcon className="ml-2 h-4 w-4 text-slate-400" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 glass border-slate-700">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => onChange(d ? d.toISOString() : undefined)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export { DatePicker };
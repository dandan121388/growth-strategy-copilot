import type { ReactNode } from "react";

const clean = (value: string) => value.replaceAll("**", "");
const tableCells = (line: string) => line.trim().slice(1, -1).split("|").map((cell) => clean(cell.trim()));

export function ReportPreview({ content }: { content: string }) {
  const lines = content.split("\n");
  const blocks: ReactNode[] = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (line.startsWith("|")) {
      const tableLines: string[] = [];
      while (index < lines.length && lines[index].startsWith("|")) {
        tableLines.push(lines[index]); index += 1;
      }
      index -= 1;
      const rows = tableLines.filter((row) => !/^\|[\s:|-]+\|$/.test(row));
      const [header, ...body] = rows.map(tableCells);
      blocks.push(<div key={`table-${index}`} className="my-4 overflow-x-auto rounded-lg border border-line"><table className="w-full min-w-[520px] text-left text-xs"><thead><tr className="bg-slate-50">{header.map((cell) => <th key={cell} className="px-3 py-2.5 font-bold text-slate-600">{cell}</th>)}</tr></thead><tbody>{body.map((row, rowIndex) => <tr key={`${row.join("-")}-${rowIndex}`} className="border-t border-line">{row.map((cell, cellIndex) => <td key={`${cell}-${cellIndex}`} className={`px-3 py-2.5 text-slate-600 ${cellIndex === 1 ? "font-semibold text-ink" : ""}`}>{cell}</td>)}</tr>)}</tbody></table></div>);
      continue;
    }
    if (line.startsWith("# ")) blocks.push(<h2 key={index} className="mb-5 text-xl font-bold text-ink">{line.slice(2)}</h2>);
    else if (line.startsWith("## ")) blocks.push(<h3 key={index} className="mb-2 mt-6 text-sm font-bold text-ink">{line.slice(3)}</h3>);
    else if (line.startsWith("### ")) blocks.push(<h4 key={index} className="mb-1 mt-4 text-xs font-bold text-navy">{line.slice(4)}</h4>);
    else if (line.startsWith("- ")) blocks.push(<p key={index} className="mb-1.5 pl-3 text-xs leading-6 text-slate-600">• {clean(line.slice(2))}</p>);
    else if (!line.trim()) blocks.push(<div key={index} className="h-2" />);
    else blocks.push(<p key={index} className="text-sm leading-6 text-slate-600">{clean(line)}</p>);
  }

  return <div className="prose-preview max-h-[680px] overflow-y-auto p-6 sm:p-8">{blocks}</div>;
}

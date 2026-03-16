"use client";

import { useState } from "react";

type Priority = "高" | "中" | "低";
type Status = "未着手" | "対応中" | "完了";

interface Task {
  id: number;
  title: string;
  assignee: string;
  priority: Priority;
  status: Status;
}

const INITIAL_TASKS: Task[] = [
  { id: 1, title: "新規クライアントとの商談準備", assignee: "田中", priority: "高", status: "対応中" },
  { id: 2, title: "週次チームミーティングの議事録作成", assignee: "鈴木", priority: "中", status: "未着手" },
  { id: 3, title: "上期売上レポートの提出", assignee: "佐藤", priority: "高", status: "完了" },
  { id: 4, title: "取引先への見積書送付", assignee: "田中", priority: "中", status: "未着手" },
  { id: 5, title: "社内研修のアンケート集計", assignee: "佐藤", priority: "低", status: "完了" },
];

const STATUS_CYCLE: Record<Status, Status> = {
  未着手: "対応中",
  対応中: "完了",
  完了: "未着手",
};

const PRIORITY_COLORS: Record<Priority, string> = {
  高: "bg-red-100 text-red-700",
  中: "bg-yellow-100 text-yellow-700",
  低: "bg-green-100 text-green-700",
};

const STATUS_COLORS: Record<Status, string> = {
  未着手: "bg-slate-100 text-slate-700",
  対応中: "bg-blue-100 text-blue-700",
  完了: "bg-emerald-100 text-emerald-700",
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [filter, setFilter] = useState<Status | "すべて">("すべて");
  const [newTitle, setNewTitle] = useState("");
  const [newAssignee, setNewAssignee] = useState("");
  const [newPriority, setNewPriority] = useState<Priority>("中");

  const statusCounts = {
    未着手: tasks.filter((t) => t.status === "未着手").length,
    対応中: tasks.filter((t) => t.status === "対応中").length,
    完了: tasks.filter((t) => t.status === "完了").length,
  };

  const filteredTasks = filter === "すべて" ? tasks : tasks.filter((t) => t.status === filter);

  const addTask = () => {
    if (!newTitle.trim()) return;
    const task: Task = {
      id: Date.now(),
      title: newTitle.trim(),
      assignee: newAssignee.trim() || "未割当",
      priority: newPriority,
      status: "未着手",
    };
    setTasks([...tasks, task]);
    setNewTitle("");
    setNewAssignee("");
    setNewPriority("中");
  };

  const cycleStatus = (id: number) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, status: STATUS_CYCLE[t.status] } : t)));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-slate-900">タスクボード</h1>
          <p className="text-sm text-slate-500 mt-1">Next.js × Azure Static Web Apps デモ</p>
        </div>
      </header>

      <main className="flex-1 px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Add Task Form */}
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <h2 className="text-sm font-semibold text-slate-700 mb-3">タスクを追加</h2>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="タスク名"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="flex-1 px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="担当者"
                value={newAssignee}
                onChange={(e) => setNewAssignee(e.target.value)}
                className="sm:w-28 px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value as Priority)}
                className="sm:w-32 px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="高">優先度: 高</option>
                <option value="中">優先度: 中</option>
                <option value="低">優先度: 低</option>
              </select>
              <button
                onClick={addTask}
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                追加
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("すべて")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                filter === "すべて" ? "bg-slate-800 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              すべて ({tasks.length})
            </button>
            {(["未着手", "対応中", "完了"] as Status[]).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(filter === status ? "すべて" : status)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  filter === status ? "bg-slate-800 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                {status} ({statusCounts[status]})
              </button>
            ))}
          </div>

          {/* Task List */}
          <div className="space-y-2">
            {filteredTasks.length === 0 ? (
              <p className="text-center text-slate-400 py-8 text-sm">タスクがありません</p>
            ) : (
              filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white rounded-lg border border-slate-200 px-4 py-3 flex items-center gap-3 hover:border-slate-300 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${task.status === "完了" ? "line-through text-slate-400" : "text-slate-900"}`}>
                      {task.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">{task.assignee}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium shrink-0 ${PRIORITY_COLORS[task.priority]}`}>
                    {task.priority}
                  </span>
                  <button
                    onClick={() => cycleStatus(task.id)}
                    className={`px-2 py-0.5 rounded text-xs font-medium shrink-0 cursor-pointer hover:opacity-80 transition-opacity ${STATUS_COLORS[task.status]}`}
                  >
                    {task.status}
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-slate-300 hover:text-red-500 transition-colors shrink-0"
                    aria-label="削除"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 px-6 py-4">
        <p className="text-center text-xs text-slate-400">
          Next.js / TypeScript / Tailwind CSS / Azure Static Web Apps
        </p>
      </footer>
    </div>
  );
}

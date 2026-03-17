import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';
import { Calendar, Download, Filter, BarChart3, Settings } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { SurveyEditor } from '../components/admin/SurveyEditor';

// Mock data
const kpiData = [
  { label: 'Регистраций', value: '1,247', change: '+12.5%' },
  { label: 'Начали опрос', value: '1,089', change: '+8.3%' },
  { label: 'Завершили', value: '867', change: '+15.2%' },
  { label: 'Конверсия', value: '79.6%', change: '+3.1%' }
];

const funnelData = [
  { step: 'Intro', users: 1089, percentage: 100 },
  { step: 'Role', users: 1042, percentage: 95.7 },
  { step: 'Marketplaces', users: 989, percentage: 90.8 },
  { step: 'Честный знак', users: 945, percentage: 86.8 },
  { step: 'Цели', users: 912, percentage: 83.7 },
  { step: 'Масштаб', users: 891, percentage: 81.8 },
  { step: 'Фулфилмент', users: 878, percentage: 80.6 },
  { step: 'Регистрация', users: 867, percentage: 79.6 }
];

const rolesData = [
  { name: 'Селлер', value: 456, color: '#10b981' },
  { name: 'Фулфилмент', value: 234, color: '#3b82f6' },
  { name: 'Бренд', value: 123, color: '#8b5cf6' },
  { name: 'Агентство', value: 54, color: '#f59e0b' }
];

const completionTrendData = [
  { date: '1 мар', rate: 72 },
  { date: '2 мар', rate: 75 },
  { date: '3 мар', rate: 73 },
  { date: '4 мар', rate: 78 },
  { date: '5 мар', rate: 76 },
  { date: '6 мар', rate: 80 },
  { date: '7 мар', rate: 79 }
];

const responsesData = [
  {
    id: 1,
    email: 'user1@example.com',
    storeName: 'Магазин "Товары для дома"',
    organizationType: 'legal' as const,
    inn: '7743013902',
    status: 'completed',
    lastStep: 7,
    lastActivity: '2026-03-08 14:30',
    source: 'organic'
  },
  {
    id: 2,
    email: 'user2@example.com',
    storeName: 'ИП Иванов',
    organizationType: 'individual' as const,
    inn: '773401390245',
    status: 'in_progress',
    lastStep: 4,
    lastActivity: '2026-03-08 13:45',
    source: 'referral'
  },
  {
    id: 3,
    email: 'user3@example.com',
    storeName: null,
    organizationType: null,
    inn: null,
    status: 'closed',
    lastStep: 2,
    lastActivity: '2026-03-08 12:20',
    source: 'organic'
  },
  {
    id: 4,
    email: 'user4@example.com',
    storeName: 'Бренд "Стиль"',
    organizationType: 'legal' as const,
    inn: '5027145630',
    status: 'completed',
    lastStep: 7,
    lastActivity: '2026-03-08 11:15',
    source: 'paid'
  }
];

const statusColors: Record<string, string> = {
  completed: 'bg-primary text-primary-foreground',
  in_progress: 'bg-blue-500 text-white',
  closed: 'bg-gray-500 text-white',
  skipped: 'bg-orange-500 text-white'
};

const statusLabels: Record<string, string> = {
  completed: 'Завершён',
  in_progress: 'В процессе',
  closed: 'Закрыт',
  skipped: 'Пропущен'
};

export const AdminPage: React.FC = () => {
  const [period, setPeriod] = useState('7');
  const [activeTab, setActiveTab] = useState<'analytics' | 'editor'>('analytics');

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Tabs */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="py-8">
            <h1 className="text-4xl font-semibold text-foreground mb-2">
              Панель администратора
            </h1>
            <p className="text-muted-foreground">
              Управление опросником и аналитика
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-6 py-3 font-medium transition-colors relative ${
                activeTab === 'analytics'
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <BarChart3 className="w-5 h-5 inline-block mr-2" />
              Аналитика
              {activeTab === 'analytics' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('editor')}
              className={`px-6 py-3 font-medium transition-colors relative ${
                activeTab === 'editor'
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Settings className="w-5 h-5 inline-block mr-2" />
              Редактор опросника
              {activeTab === 'editor' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:px-8">
        {activeTab === 'analytics' ? (
          <>
            {/* Filters */}
            <div className="bg-card rounded-xl p-6 mb-6 border border-border">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <select
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="7">Последние 7 дней</option>
                    <option value="30">Последние 30 дней</option>
                    <option value="90">Последние 90 дней</option>
                  </select>
                </div>
                
                <Button variant="secondary" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Фильтры
                </Button>
                
                <Button variant="secondary" size="sm" className="ml-auto">
                  <Download className="w-4 h-4 mr-2" />
                  Экспорт CSV
                </Button>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {kpiData.map((kpi, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl p-6 border border-border hover:shadow-md transition-shadow"
                >
                  <div className="text-sm text-muted-foreground mb-2">
                    {kpi.label}
                  </div>
                  <div className="flex items-end justify-between">
                    <div className="text-3xl font-semibold text-foreground">
                      {kpi.value}
                    </div>
                    <div className="text-sm text-primary font-medium">
                      {kpi.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Funnel Chart */}
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-6">
                  Воронка опросника
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={funnelData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis type="number" stroke="#6b7280" />
                    <YAxis dataKey="step" type="category" width={100} stroke="#6b7280" />
                    <RechartsTooltip
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="users" fill="#10b981" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Roles Distribution */}
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-6">
                  Распределение по ролям
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={rolesData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name}: ${entry.value}`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {rolesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Completion Trend */}
            <div className="bg-card rounded-xl p-6 mb-6 border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-6">
                Динамика конверсии
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={completionTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="rate"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: '#10b981', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Responses Table */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-6">
                Ответы пользователей
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                        Email
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                        Название магазина
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                        Тип
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                        ИНН
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                        Статус
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                        Шаг
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                        Последняя активность
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {responsesData.map((response) => (
                      <tr key={response.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                        <td className="py-4 px-4 text-sm text-foreground">
                          {response.email}
                        </td>
                        <td className="py-4 px-4 text-sm text-foreground">
                          {response.storeName || '—'}
                        </td>
                        <td className="py-4 px-4 text-sm text-foreground">
                          {response.organizationType === 'individual' ? 'ИП' : 
                           response.organizationType === 'legal' ? 'Юр.лицо' : '—'}
                        </td>
                        <td className="py-4 px-4 text-sm text-foreground font-mono">
                          {response.inn || '—'}
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              statusColors[response.status]
                            }`}
                          >
                            {statusLabels[response.status]}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-sm text-foreground">
                          {response.lastStep}/7
                        </td>
                        <td className="py-4 px-4 text-sm text-muted-foreground">
                          {response.lastActivity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <SurveyEditor />
        )}
      </div>
    </div>
  );
};
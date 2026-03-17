import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  Users, 
  TrendingUp, 
  CheckCircle2, 
  Clock,
  ArrowLeft,
  Download,
  Filter,
  Search,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart as RechartsPie,
  Pie,
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Funnel,
  FunnelChart
} from 'recharts';

export const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'funnel'>('overview');

  // Mock data
  const kpiData = [
    { label: 'Всего пользователей', value: '1,247', change: '+12%', trend: 'up', icon: Users },
    { label: 'Завершили онбординг', value: '892', change: '+8%', trend: 'up', icon: CheckCircle2 },
    { label: 'В процессе', value: '355', change: '+15%', trend: 'up', icon: Clock },
    { label: 'Конверсия', value: '71.5%', change: '+3%', trend: 'up', icon: TrendingUp },
  ];

  const dailyRegistrations = [
    { date: '10 Мар', users: 45 },
    { date: '11 Мар', users: 52 },
    { date: '12 Мар', users: 48 },
    { date: '13 Мар', users: 61 },
    { date: '14 Мар', users: 55 },
    { date: '15 Мар', users: 67 },
    { date: '16 Мар', users: 73 },
  ];

  const completionByStep = [
    { step: 'Шаг 1', completed: 1247, incomplete: 0 },
    { step: 'Шаг 2', completed: 1189, incomplete: 58 },
    { step: 'Шаг 3', completed: 1124, incomplete: 123 },
    { step: 'Шаг 4', completed: 1056, incomplete: 191 },
    { step: 'Шаг 5', completed: 987, incomplete: 260 },
    { step: 'Шаг 6', completed: 934, incomplete: 313 },
    { step: 'Шаг 7', completed: 892, incomplete: 355 },
  ];

  const funnelData = [
    { value: 1247, name: 'Регистрация', fill: '#10b981' },
    { value: 1189, name: 'Шаг 1', fill: '#059669' },
    { value: 1124, name: 'Шаг 2', fill: '#047857' },
    { value: 1056, name: 'Шаг 3', fill: '#065f46' },
    { value: 987, name: 'Шаг 4', fill: '#064e3b' },
    { value: 934, name: 'Шаг 5', fill: '#022c22' },
    { value: 892, name: 'Завершение', fill: '#111827' },
  ];

  const platformDistribution = [
    { name: 'Wildberries', value: 456, color: '#8b5cf6' },
    { name: 'Ozon', value: 389, color: '#3b82f6' },
    { name: 'Яндекс.Маркет', value: 267, color: '#eab308' },
    { name: 'AliExpress', value: 178, color: '#ef4444' },
    { name: 'Другие', value: 145, color: '#6b7280' },
  ];

  const userAnswers = [
    {
      id: 1,
      name: 'Иван Петров',
      email: 'ivan@example.com',
      role: 'Владелец бизнеса',
      teamSize: '2-5',
      skuCount: '101-500',
      platforms: 'Wildberries, Ozon',
      status: 'Завершено',
      date: '17.03.2026',
    },
    {
      id: 2,
      name: 'Мария Сидорова',
      email: 'maria@example.com',
      role: 'Менеджер',
      teamSize: '6-20',
      skuCount: '501-2000',
      platforms: 'Ozon, Яндекс.Маркет',
      status: 'Завершено',
      date: '17.03.2026',
    },
    {
      id: 3,
      name: 'Алексей Иванов',
      email: 'alexey@example.com',
      role: 'Специалист склада',
      teamSize: '1',
      skuCount: '1-100',
      platforms: 'Wildberries',
      status: 'Шаг 5/7',
      date: '16.03.2026',
    },
    {
      id: 4,
      name: 'Елена Смирнова',
      email: 'elena@example.com',
      role: 'Владелец бизнеса',
      teamSize: '20+',
      skuCount: '2000+',
      platforms: 'Wildberries, Ozon, Яндекс.Маркет',
      status: 'Завершено',
      date: '16.03.2026',
    },
    {
      id: 5,
      name: 'Дмитрий Козлов',
      email: 'dmitry@example.com',
      role: 'Менеджер',
      teamSize: '2-5',
      skuCount: '101-500',
      platforms: 'Ozon',
      status: 'Шаг 3/7',
      date: '15.03.2026',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-semibold">Админ-панель</h1>
                <p className="text-sm text-muted-foreground">Аналитика и управление</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Экспорт</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`
              px-6 py-3 rounded-lg transition-all whitespace-nowrap
              ${activeTab === 'overview'
                ? 'bg-primary text-primary-foreground'
                : 'bg-card border border-border hover:bg-secondary'
              }
            `}
          >
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Обзор
            </div>
          </button>
          <button
            onClick={() => setActiveTab('funnel')}
            className={`
              px-6 py-3 rounded-lg transition-all whitespace-nowrap
              ${activeTab === 'funnel'
                ? 'bg-primary text-primary-foreground'
                : 'bg-card border border-border hover:bg-secondary'
              }
            `}
          >
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Воронка
            </div>
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`
              px-6 py-3 rounded-lg transition-all whitespace-nowrap
              ${activeTab === 'users'
                ? 'bg-primary text-primary-foreground'
                : 'bg-card border border-border hover:bg-secondary'
              }
            `}
          >
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Пользователи
            </div>
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {kpiData.map((kpi, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-2xl p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <kpi.icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-sm px-2 py-1 rounded-lg bg-primary/10 text-primary">
                      {kpi.change}
                    </span>
                  </div>
                  <div className="text-3xl font-semibold mb-1">{kpi.value}</div>
                  <div className="text-sm text-muted-foreground">{kpi.label}</div>
                </div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Daily Registrations */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-semibold mb-6">Регистрации по дням</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dailyRegistrations}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="date" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#ffffff', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="users" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      dot={{ fill: '#10b981', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Platform Distribution */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-semibold mb-6">Распределение по платформам</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPie>
                    <Pie
                      data={platformDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {platformDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPie>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Completion by Step */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-semibold mb-6">Прохождение шагов онбординга</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={completionByStep}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="step" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="completed" stackId="a" fill="#10b981" name="Завершили" />
                  <Bar dataKey="incomplete" stackId="a" fill="#e5e7eb" name="Не завершили" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Funnel Tab */}
        {activeTab === 'funnel' && (
          <div className="space-y-8">
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-semibold mb-6">Воронка конверсии онбординга</h3>
              
              {/* Funnel visualization */}
              <div className="space-y-4 mb-8">
                {funnelData.map((item, index) => {
                  const widthPercent = (item.value / funnelData[0].value) * 100;
                  const dropoff = index > 0 ? funnelData[index - 1].value - item.value : 0;
                  const dropoffPercent = index > 0 ? ((dropoff / funnelData[index - 1].value) * 100).toFixed(1) : 0;
                  
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{item.name}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-muted-foreground">{item.value} пользователей</span>
                          {index > 0 && dropoff > 0 && (
                            <span className="text-destructive">
                              -{dropoff} ({dropoffPercent}%)
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="relative h-16 flex items-center justify-center">
                        <div
                          className="h-full rounded-lg transition-all flex items-center justify-center text-white font-medium"
                          style={{ 
                            width: `${widthPercent}%`,
                            backgroundColor: item.fill
                          }}
                        >
                          {widthPercent.toFixed(0)}%
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Conversion insights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-border">
                <div className="p-4 bg-primary/5 rounded-xl">
                  <div className="text-sm text-muted-foreground mb-1">Общая конверсия</div>
                  <div className="text-2xl font-semibold text-primary">
                    {((funnelData[6].value / funnelData[0].value) * 100).toFixed(1)}%
                  </div>
                </div>
                <div className="p-4 bg-primary/5 rounded-xl">
                  <div className="text-sm text-muted-foreground mb-1">Наибольший отсев</div>
                  <div className="text-2xl font-semibold text-primary">Шаг 3</div>
                </div>
                <div className="p-4 bg-primary/5 rounded-xl">
                  <div className="text-sm text-muted-foreground mb-1">Среднее время</div>
                  <div className="text-2xl font-semibold text-primary">4.5 мин</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Поиск по имени или email..."
                    className="w-full pl-12 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-3 border border-border rounded-lg hover:bg-secondary transition-colors">
                  <Filter className="w-4 h-4" />
                  <span>Фильтры</span>
                </button>
              </div>
            </div>

            {/* Users table */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary">
                    <tr>
                      <th className="text-left px-6 py-4 text-sm font-medium">Пользователь</th>
                      <th className="text-left px-6 py-4 text-sm font-medium hidden md:table-cell">Роль</th>
                      <th className="text-left px-6 py-4 text-sm font-medium hidden lg:table-cell">Команда</th>
                      <th className="text-left px-6 py-4 text-sm font-medium hidden lg:table-cell">SKU</th>
                      <th className="text-left px-6 py-4 text-sm font-medium hidden xl:table-cell">Платформы</th>
                      <th className="text-left px-6 py-4 text-sm font-medium">Статус</th>
                      <th className="text-left px-6 py-4 text-sm font-medium hidden sm:table-cell">Дата</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {userAnswers.map((user) => (
                      <tr key={user.id} className="hover:bg-secondary/50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm hidden md:table-cell">{user.role}</td>
                        <td className="px-6 py-4 text-sm hidden lg:table-cell">{user.teamSize}</td>
                        <td className="px-6 py-4 text-sm hidden lg:table-cell">{user.skuCount}</td>
                        <td className="px-6 py-4 text-sm hidden xl:table-cell">
                          <div className="max-w-xs truncate">{user.platforms}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`
                            inline-flex items-center gap-1 px-3 py-1 rounded-lg text-sm
                            ${user.status === 'Завершено'
                              ? 'bg-primary/10 text-primary'
                              : 'bg-secondary text-muted-foreground'
                            }
                          `}>
                            {user.status === 'Завершено' ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : (
                              <Clock className="w-4 h-4" />
                            )}
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground hidden sm:table-cell">
                          {user.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Показано 1-5 из 1,247
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors disabled:opacity-50" disabled>
                  Назад
                </button>
                <button className="px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors">
                  Далее
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

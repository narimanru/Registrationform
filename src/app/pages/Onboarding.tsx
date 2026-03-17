import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useOnboarding } from '../context/OnboardingContext';
import { ProgressBar } from '../components/ProgressBar';
import { TermWithTooltip } from '../components/Tooltip';
import { ArrowRight, ArrowLeft, Check, Building2, Users, Package, ShoppingCart, Warehouse, Link as LinkIcon, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const TOTAL_STEPS = 7;

export const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const { data, updateData } = useOnboarding();
  const [currentStep, setCurrentStep] = useState(data.currentStep || 1);

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      updateData({ currentStep: nextStep });
    } else {
      // Complete onboarding
      updateData({ completedAt: new Date().toISOString(), currentStep: TOTAL_STEPS });
      localStorage.setItem('fastwms_onboarding_completed', 'true');
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      updateData({ currentStep: prevStep });
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return Boolean(data.role);
      case 2:
        return Boolean(data.teamSize);
      case 3:
        return Boolean(data.skuCount);
      case 4:
        return Boolean(data.platforms && data.platforms.length > 0);
      case 5:
        return data.hasWarehouses !== undefined;
      case 6:
        return true; // Optional step
      case 7:
        return Boolean(
          data.companyName &&
          data.organizationType &&
          data.inn &&
          data.shortSellerName &&
          data.legalAddress
        );
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-semibold mb-2">Настройка FASTWMS</h1>
          <p className="text-muted-foreground">
            Ответьте на несколько вопросов, чтобы мы настроили систему под ваш бизнес
          </p>
        </motion.div>

        {/* Progress */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
        </motion.div>

        {/* Steps */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm mb-6"
          >
            {currentStep === 1 && <Step1 data={data} updateData={updateData} />}
            {currentStep === 2 && <Step2 data={data} updateData={updateData} />}
            {currentStep === 3 && <Step3 data={data} updateData={updateData} />}
            {currentStep === 4 && <Step4 data={data} updateData={updateData} />}
            {currentStep === 5 && <Step5 data={data} updateData={updateData} />}
            {currentStep === 6 && <Step6 data={data} updateData={updateData} />}
            {currentStep === 7 && <Step7 data={data} updateData={updateData} />}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="px-6 py-3 rounded-lg border border-border hover:bg-secondary transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Назад
          </button>

          <div className="text-sm text-muted-foreground">
            {currentStep} из {TOTAL_STEPS}
          </div>

          <button
            onClick={handleNext}
            disabled={!isStepValid()}
            className="px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 group"
          >
            {currentStep === TOTAL_STEPS ? 'Завершить' : 'Далее'}
            {currentStep === TOTAL_STEPS ? (
              <Check className="w-5 h-5" />
            ) : (
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Step 1: Role
const Step1: React.FC<any> = ({ data, updateData }) => {
  const roles = [
    { id: 'owner', label: 'Владелец бизнеса', icon: Building2 },
    { id: 'manager', label: 'Менеджер / Руководитель', icon: Users },
    { id: 'specialist', label: 'Фульфилмент', icon: Package },
    { id: 'other', label: 'Другое', icon: Users },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Какая ваша роль в компании?</h2>
        <p className="text-muted-foreground">Это поможет нам персонализировать интерфейс</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => updateData({ role: role.id })}
            className={`
              p-6 rounded-xl border-2 transition-all text-left
              ${data.role === role.id
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
              }
            `}
          >
            <role.icon className={`w-8 h-8 mb-3 ${data.role === role.id ? 'text-primary' : 'text-muted-foreground'}`} />
            <div className="font-medium">{role.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

// Step 2: Team size
const Step2: React.FC<any> = ({ data, updateData }) => {
  const sizes = [
    { id: '1', label: 'Только я', description: 'Индивидуальный предприниматель' },
    { id: '2-5', label: '2-5 человек', description: 'Малая команда' },
    { id: '6-20', label: '6-20 человек', description: 'Средн��я команда' },
    { id: '20+', label: 'Более 20', description: 'Крупная команда' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Размер вашей команды?</h2>
        <p className="text-muted-foreground">Сколько человек будут работать с системой</p>
      </div>

      <div className="space-y-3">
        {sizes.map((size) => (
          <button
            key={size.id}
            onClick={() => updateData({ teamSize: size.id })}
            className={`
              w-full p-5 rounded-xl border-2 transition-all text-left flex items-center justify-between
              ${data.teamSize === size.id
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
              }
            `}
          >
            <div>
              <div className="font-medium mb-1">{size.label}</div>
              <div className="text-sm text-muted-foreground">{size.description}</div>
            </div>
            {data.teamSize === size.id && (
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <Check className="w-4 h-4 text-primary-foreground" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

// Step 3: SKU count
const Step3: React.FC<any> = ({ data, updateData }) => {
  const ranges = [
    { id: '1-100', label: '1-100 SKU', description: 'Начинающий бизнес' },
    { id: '101-500', label: '101-500 SKU', description: 'Растущий ассортимент' },
    { id: '501-2000', label: '501-2000 SKU', description: 'Широкий ассортимент' },
    { id: '2000+', label: 'Более 2000 SKU', description: 'Крупный каталог' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">
          Сколько у вас <TermWithTooltip term="SKU" />?
        </h2>
        <p className="text-muted-foreground">Примерное количество уникальных товаров</p>
      </div>

      <div className="space-y-3">
        {ranges.map((range) => (
          <button
            key={range.id}
            onClick={() => updateData({ skuCount: range.id })}
            className={`
              w-full p-5 rounded-xl border-2 transition-all text-left flex items-center justify-between
              ${data.skuCount === range.id
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
              }
            `}
          >
            <div>
              <div className="font-medium mb-1">{range.label}</div>
              <div className="text-sm text-muted-foreground">{range.description}</div>
            </div>
            {data.skuCount === range.id && (
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <Check className="w-4 h-4 text-primary-foreground" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

// Step 4: Platforms
const Step4: React.FC<any> = ({ data, updateData }) => {
  const platforms = [
    { id: 'wildberries', label: 'Wildberries', color: 'bg-purple-500' },
    { id: 'ozon', label: 'Ozon', color: 'bg-blue-500' },
    { id: 'yandex', label: 'Яндекс.Маркет', color: 'bg-yellow-500' },
    { id: 'aliexpress', label: 'AliExpress', color: 'bg-red-500' },
    { id: 'avito', label: 'Avito', color: 'bg-green-500' },
    { id: 'other', label: 'Другие', color: 'bg-gray-500' },
  ];

  const togglePlatform = (platformId: string) => {
    const current = data.platforms || [];
    const updated = current.includes(platformId)
      ? current.filter((p: string) => p !== platformId)
      : [...current, platformId];
    updateData({ platforms: updated });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">На каких платформах вы продаете?</h2>
        <p className="text-muted-foreground">Выберите все подходящие варианты</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {platforms.map((platform) => {
          const isSelected = data.platforms?.includes(platform.id);
          return (
            <button
              key={platform.id}
              onClick={() => togglePlatform(platform.id)}
              className={`
                p-5 rounded-xl border-2 transition-all text-left relative
                ${isSelected
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
                }
              `}
            >
              <div className={`w-10 h-10 rounded-lg ${platform.color} mb-3 opacity-80`} />
              <div className="font-medium">{platform.label}</div>
              {isSelected && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Step 5: Warehouses
const Step5: React.FC<any> = ({ data, updateData }) => {
  const [showWarehouseCount, setShowWarehouseCount] = useState(data.hasWarehouses || false);
  const [showCabinets, setShowCabinets] = useState(data.hasCabinets || false);

  const handleWarehouseResponse = (hasWarehouses: boolean) => {
    updateData({ hasWarehouses });
    setShowWarehouseCount(hasWarehouses);
    if (!hasWarehouses) {
      updateData({ warehouseCount: undefined });
    }
  };

  const handleCabinetResponse = (hasCabinets: boolean) => {
    updateData({ hasCabinets });
    setShowCabinets(hasCabinets);
    if (!hasCabinets) {
      updateData({ cabinetPlatforms: [] });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-2">Склады и <TermWithTooltip term="Кабинеты" /></h2>
        <p className="text-muted-foreground">Расскажите о вашей инфраструктуре</p>
      </div>

      {/* Warehouses */}
      <div className="space-y-4">
        <h3 className="font-medium">Есть ли у вас собственные склады?</h3>
        <div className="flex gap-3">
          <button
            onClick={() => handleWarehouseResponse(true)}
            className={`
              flex-1 p-4 rounded-xl border-2 transition-all
              ${data.hasWarehouses === true
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
              }
            `}
          >
            Да
          </button>
          <button
            onClick={() => handleWarehouseResponse(false)}
            className={`
              flex-1 p-4 rounded-xl border-2 transition-all
              ${data.hasWarehouses === false
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
              }
            `}
          >
            Нет
          </button>
        </div>

        {showWarehouseCount && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-300">
            <label className="block text-sm mb-2">Сколько складов?</label>
            <input
              type="number"
              min="1"
              value={data.warehouseCount || ''}
              onChange={(e) => updateData({ warehouseCount: e.target.value })}
              placeholder="Введите количество"
              className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
        )}
      </div>

      {/* Cabinets */}
      <div className="space-y-4">
        <h3 className="font-medium">Используете ли вы кабинеты на маркетплейсах?</h3>
        <div className="flex gap-3">
          <button
            onClick={() => handleCabinetResponse(true)}
            className={`
              flex-1 p-4 rounded-xl border-2 transition-all
              ${data.hasCabinets === true
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
              }
            `}
          >
            Да
          </button>
          <button
            onClick={() => handleCabinetResponse(false)}
            className={`
              flex-1 p-4 rounded-xl border-2 transition-all
              ${data.hasCabinets === false
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
              }
            `}
          >
            Нет
          </button>
        </div>
      </div>
    </div>
  );
};

// Step 6: Integrations
const Step6: React.FC<any> = ({ data, updateData }) => {
  const integrations = [
    { id: 'honest_sign', label: 'Честный знак', description: 'Маркировка товаров' },
    { id: 'upd', label: 'УПД', description: 'Электронный документооборот' },
    { id: 'rbac', label: 'RBAC', description: 'Управление доступом' },
    { id: '1c', label: '1С', description: 'Интеграция с 1С' },
  ];

  const toggleIntegration = (integrationId: string) => {
    const current = data.integrations || [];
    const updated = current.includes(integrationId)
      ? current.filter((i: string) => i !== integrationId)
      : [...current, integrationId];
    updateData({ integrations: updated });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Какие интеграции вам нужны?</h2>
        <p className="text-muted-foreground">Выберите необходимые интеграции (можно пропустить)</p>
      </div>

      <div className="space-y-3">
        {integrations.map((integration) => {
          const isSelected = data.integrations?.includes(integration.id);
          const term = integration.id === 'honest_sign' ? 'Честный знак' 
                     : integration.id === 'upd' ? 'УПД'
                     : integration.id === 'rbac' ? 'RBAC'
                     : null;

          return (
            <button
              key={integration.id}
              onClick={() => toggleIntegration(integration.id)}
              className={`
                w-full p-5 rounded-xl border-2 transition-all text-left flex items-center justify-between
                ${isSelected
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
                }
              `}
            >
              <div>
                <div className="font-medium mb-1">
                  {term ? <TermWithTooltip term={term as any} /> : integration.label}
                </div>
                <div className="text-sm text-muted-foreground">{integration.description}</div>
              </div>
              {isSelected && (
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Step 7: Company registration
const Step7: React.FC<any> = ({ data, updateData }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Регистрация компании</h2>
        <p className="text-muted-foreground">Заполните данные вашей организации</p>
      </div>

      <div className="space-y-4">
        {/* Company name */}
        <div>
          <label className="block text-sm mb-2">Название магазина</label>
          <input
            type="text"
            value={data.companyName || ''}
            onChange={(e) => updateData({ companyName: e.target.value })}
            placeholder="ООО 'Мой Магазин'"
            className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>

        {/* Organization type */}
        <div>
          <label className="block text-sm mb-2">Тип организации</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => updateData({ organizationType: 'IP' })}
              className={`
                p-4 rounded-xl border-2 transition-all
                ${data.organizationType === 'IP'
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
                }
              `}
            >
              <div className="font-medium">ИП</div>
              <div className="text-xs text-muted-foreground mt-1">Индивидуальный предприниматель</div>
            </button>
            <button
              onClick={() => updateData({ organizationType: 'OOO' })}
              className={`
                p-4 rounded-xl border-2 transition-all
                ${data.organizationType === 'OOO'
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
                }
              `}
            >
              <div className="font-medium">ООО</div>
              <div className="text-xs text-muted-foreground mt-1">Общество с ограниченной ответственностью</div>
            </button>
          </div>
        </div>

        {/* INN */}
        <div>
          <label className="block text-sm mb-2">ИНН</label>
          <input
            type="text"
            value={data.inn || ''}
            onChange={(e) => updateData({ inn: e.target.value })}
            placeholder={data.organizationType === 'IP' ? '12 цифр' : '10 цифр'}
            maxLength={data.organizationType === 'IP' ? 12 : 10}
            className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>

        {/* Short seller name */}
        <div>
          <label className="block text-sm mb-2">Короткое наименование продавца</label>
          <input
            type="text"
            value={data.shortSellerName || ''}
            onChange={(e) => updateData({ shortSellerName: e.target.value })}
            placeholder="МойМагазин"
            className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>

        {/* Legal address */}
        <div>
          <label className="block text-sm mb-2">Юридический адрес для печати этикеток</label>
          <textarea
            value={data.legalAddress || ''}
            onChange={(e) => updateData({ legalAddress: e.target.value })}
            placeholder="г. Москва, ул. Примерная, д. 1, офис 1"
            rows={3}
            className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
          />
        </div>
      </div>
    </div>
  );
};
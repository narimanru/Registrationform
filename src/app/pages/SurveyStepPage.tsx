import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { X } from 'lucide-react';
import { useSurvey } from '../context/SurveyContext';
import { TOTAL_STEPS, ROLES, MARKETPLACES, GOALS } from '../types/survey';
import { Stepper } from '../components/survey/Stepper';
import { OptionCard } from '../components/survey/OptionCard';
import { Chip } from '../components/survey/Chip';
import { BottomBar } from '../components/survey/BottomBar';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Tooltip } from '../components/ui/Tooltip';
import * as ProgressPrimitive from '@radix-ui/react-progress';

export const SurveyStepPage: React.FC = () => {
  const { step } = useParams<{ step: string }>();
  const navigate = useNavigate();
  const { surveyData, updateSurveyData, closeSurvey, resumeSurvey } = useSurvey();
  
  const currentStep = parseInt(step || '1', 10);
  const [showExitModal, setShowExitModal] = useState(false);
  const [showSubQuestion, setShowSubQuestion] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Resume survey if it was closed
  useEffect(() => {
    if (surveyData.status === 'closed') {
      resumeSurvey();
    }
  }, []);

  const progress = (currentStep / TOTAL_STEPS) * 100;

  const handleNext = async () => {
    if (!canProceed()) return;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    updateSurveyData({ currentStep: currentStep + 1 });
    
    if (currentStep === TOTAL_STEPS) {
      navigate('/survey/success');
    } else {
      navigate(`/survey/step/${currentStep + 1}`);
    }
    
    setIsLoading(false);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      updateSurveyData({ currentStep: currentStep - 1 });
      navigate(`/survey/step/${currentStep - 1}`);
    } else {
      navigate('/survey/intro');
    }
  };

  const handleClose = () => {
    setShowExitModal(true);
  };

  const handleConfirmExit = () => {
    closeSurvey();
    navigate('/dashboard');
  };

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 1:
        if (!surveyData.role) return false;
        if (showSubQuestion && !surveyData.clientsCount) return false;
        return true;
      case 2:
        return !!surveyData.marketplaces && surveyData.marketplaces.length > 0;
      case 3:
        if (!surveyData.honestSign) return false;
        if (showSubQuestion && !surveyData.printOwner) return false;
        return true;
      case 4:
        return !!surveyData.primaryGoals && surveyData.primaryGoals.length > 0;
      case 5:
        return !!surveyData.skuRange && !!surveyData.cabinetsRange;
      case 6:
        return !!surveyData.fulfillment;
      case 7:
        // Required fields: storeName, organizationType, inn, shortSellerName, shortAddress, telegram or email
        return !!(
          surveyData.storeName &&
          surveyData.organizationType &&
          surveyData.inn &&
          surveyData.shortSellerName &&
          surveyData.shortAddress &&
          (surveyData.telegram || surveyData.email)
        );
      default:
        return true;
    }
  };

  // Handle sub-questions visibility
  useEffect(() => {
    if (currentStep === 1) {
      setShowSubQuestion(surveyData.role === 'fulfillment' || surveyData.role === 'agency');
    } else if (currentStep === 3) {
      setShowSubQuestion(
        surveyData.honestSign === 'yes-working' || surveyData.honestSign === 'yes-starting'
      );
    }
  }, [currentStep, surveyData.role, surveyData.honestSign]);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-semibold text-foreground mb-2">
                Ваша роль в бизнесе
              </h2>
              <p className="text-muted-foreground">
                Это поможет настроить интерфейс под ваши задачи
              </p>
            </div>
            
            <div className="space-y-4">
              {ROLES.map((role) => (
                <OptionCard
                  key={role.value}
                  value={role.value}
                  label={role.label}
                  description={role.description}
                  selected={surveyData.role === role.value}
                  onClick={() => updateSurveyData({ role: role.value })}
                />
              ))}
            </div>

            {showSubQuestion && (
              <div className="mt-8 p-6 bg-muted rounded-xl">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  Сколько клиентов/кабинетов ведёте?
                  <Tooltip content="Отдельная организация/аккаунт (ИП/ООО или клиент у фулфилмента)." />
                </h3>
                <div className="flex flex-wrap gap-3">
                  {['1–3', '4–10', '10+'].map((range) => (
                    <Chip
                      key={range}
                      label={range}
                      selected={surveyData.clientsCount === range}
                      onClick={() => updateSurveyData({ clientsCount: range })}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-semibold text-foreground mb-2">
                На каких маркетплейсах работаете?
              </h2>
              <p className="text-muted-foreground">
                Можно выбрать несколько
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {MARKETPLACES.map((marketplace) => (
                <Chip
                  key={marketplace}
                  label={marketplace}
                  selected={surveyData.marketplaces?.includes(marketplace)}
                  onClick={() => {
                    const current = surveyData.marketplaces || [];
                    const updated = current.includes(marketplace)
                      ? current.filter(m => m !== marketplace)
                      : [...current, marketplace];
                    updateSurveyData({ marketplaces: updated });
                  }}
                />
              ))}
            </div>

            {surveyData.marketplaces?.includes('Другое') && (
              <Input
                placeholder="Укажите маркетплейс"
                value={surveyData.marketplacesOther || ''}
                onChange={(e) => updateSurveyData({ marketplacesOther: e.target.value })}
              />
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-semibold text-foreground mb-2 flex items-center">
                Работаете с Честным знаком?
                <Tooltip content="Коды маркировки. FASTWMS хранит, распределяет и помогает печатать." />
              </h2>
              <p className="text-muted-foreground">
                Маркировка товаров DataMatrix кодами
              </p>
            </div>
            
            <div className="space-y-3">
              {[
                { value: 'yes-working', label: 'Да, уже работаем' },
                { value: 'yes-starting', label: 'Да, начинаем' },
                { value: 'no', label: 'Нет' },
                { value: 'unknown', label: 'Не знаю' }
              ].map((option) => (
                <OptionCard
                  key={option.value}
                  value={option.value}
                  label={option.label}
                  selected={surveyData.honestSign === option.value}
                  onClick={() => updateSurveyData({ honestSign: option.value })}
                />
              ))}
            </div>

            {showSubQuestion && (
              <div className="mt-8 p-6 bg-muted rounded-xl">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Кто печатает коды?
                </h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    { value: 'ourselves', label: 'Мы сами' },
                    { value: 'fulfillment', label: 'Фулфилмент' },
                    { value: 'production', label: 'Производство' }
                  ].map((option) => (
                    <Chip
                      key={option.value}
                      label={option.label}
                      selected={surveyData.printOwner === option.value}
                      onClick={() => updateSurveyData({ printOwner: option.value })}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-semibold text-foreground mb-2">
                Главные задачи сейчас
              </h2>
              <p className="text-muted-foreground">
                Что хотите настроить в первую очередь? Можно выбрать несколько
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {GOALS.map((goal) => (
                <OptionCard
                  key={goal.value}
                  value={goal.value}
                  label={goal.label}
                  icon={goal.icon}
                  selected={surveyData.primaryGoals?.includes(goal.value)}
                  onClick={() => {
                    const current = surveyData.primaryGoals || [];
                    const updated = current.includes(goal.value)
                      ? current.filter(m => m !== goal.value)
                      : [...current, goal.value];
                    updateSurveyData({ primaryGoals: updated });
                  }}
                />
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-semibold text-foreground mb-2">
                Масштаб работы
              </h2>
              <p className="text-muted-foreground">
                Это поможет оптимизировать интерфейс
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                Количество SKU
                <Tooltip content="SKU = товарная позиция. Часто размер считают отдельным SKU." />
              </h3>
              <div className="flex flex-wrap gap-3">
                {['до 50', '50–200', '200–1000', '1000+'].map((range) => (
                  <Chip
                    key={range}
                    label={range}
                    selected={surveyData.skuRange === range}
                    onClick={() => updateSurveyData({ skuRange: range })}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                Количество кабинетов
                <Tooltip content="Отдельная организация/аккаунт (ИП/ООО или клиент у фулфилмента)." />
              </h3>
              <div className="flex flex-wrap gap-3">
                {['1', '2–5', '5+'].map((range) => (
                  <Chip
                    key={range}
                    label={range}
                    selected={surveyData.cabinetsRange === range}
                    onClick={() => updateSurveyData({ cabinetsRange: range })}
                  />
                ))}
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-semibold text-foreground mb-2">
                Фулфилмент
              </h2>
              <p className="text-muted-foreground">
                Работаете с партнёрами по хранению и отправке?
              </p>
            </div>
            
            <div className="space-y-3">
              {[
                { value: 'yes', label: 'Да, работаем с фулфилментом' },
                { value: 'no', label: 'Нет, свой склад' },
                { value: 'planning', label: 'Планируем подключить' }
              ].map((option) => (
                <OptionCard
                  key={option.value}
                  value={option.value}
                  label={option.label}
                  selected={surveyData.fulfillment === option.value}
                  onClick={() => updateSurveyData({ fulfillment: option.value })}
                />
              ))}
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-semibold text-foreground mb-2">
                Завершение регистрации
              </h2>
              <p className="text-muted-foreground">
                Заполните данные вашей компании
              </p>
            </div>
            
            <div className="space-y-6">
              {/* Название магазина */}
              <Input
                label="Название магазина"
                placeholder="Название вашего магазина"
                value={surveyData.storeName || ''}
                onChange={(e) => updateSurveyData({ storeName: e.target.value })}
                helperText="Отображается в каталоге"
              />

              {/* Тип организации */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Тип организации
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => updateSurveyData({ organizationType: 'individual' })}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      surveyData.organizationType === 'individual'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="font-medium text-foreground">ИП</div>
                    <div className="text-sm text-muted-foreground mt-1">Индивидуальный предприниматель</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => updateSurveyData({ organizationType: 'legal' })}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      surveyData.organizationType === 'legal'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="font-medium text-foreground">Юр.лицо</div>
                    <div className="text-sm text-muted-foreground mt-1">Юридическое лицо</div>
                  </button>
                </div>
              </div>

              {/* ИНН */}
              <Input
                label="ИНН"
                placeholder="1234567890"
                value={surveyData.inn || ''}
                onChange={(e) => updateSurveyData({ inn: e.target.value })}
                helperText="Нужен для идентификации пользователя"
                maxLength={12}
              />

              {/* Короткое наименование продавца */}
              <Input
                label="Короткое наименование продавца"
                placeholder="Иванов И.И."
                value={surveyData.shortSellerName || ''}
                onChange={(e) => updateSurveyData({ shortSellerName: e.target.value })}
                helperText="Нужно для печати этикеток"
              />

              {/* Короткий юридический адрес */}
              <Input
                label="Короткий юридический адрес"
                placeholder="г. Москва, ул. Ленина, д. 1"
                value={surveyData.shortAddress || ''}
                onChange={(e) => updateSurveyData({ shortAddress: e.target.value })}
                helperText="Для печати этикеток"
              />

              {/* Контакты */}
              <div className="pt-4 border-t border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Контакты для связи
                </h3>
                <div className="space-y-4">
                  <Input
                    label="Telegram"
                    placeholder="@username или +7..."
                    value={surveyData.telegram || ''}
                    onChange={(e) => updateSurveyData({ telegram: e.target.value })}
                  />
                  
                  <Input
                    label="Email (необязательно)"
                    type="email"
                    placeholder="your@email.com"
                    value={surveyData.email || ''}
                    onChange={(e) => updateSurveyData({ email: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pb-32">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-4 md:px-8 md:py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <Stepper currentStep={currentStep} />
            </div>
            <button
              onClick={handleClose}
              className="ml-4 p-2 rounded-lg hover:bg-secondary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <ProgressPrimitive.Root
            value={progress}
            className="h-2 w-full overflow-hidden rounded-full bg-secondary"
          >
            <ProgressPrimitive.Indicator
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </ProgressPrimitive.Root>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8 md:px-8 md:py-12">
        {renderStepContent()}
      </div>

      {/* Bottom Bar */}
      <BottomBar
        onBack={handleBack}
        onNext={handleNext}
        nextDisabled={!canProceed()}
        nextLoading={isLoading}
        showBack={currentStep > 1}
        nextLabel={currentStep === TOTAL_STEPS ? 'Завершить' : 'Далее'}
      />

      {/* Exit Modal */}
      <Modal
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
        title="Продолжить позже?"
        description={`Мы сохраним ответы. Осталось ${TOTAL_STEPS - currentStep} из ${TOTAL_STEPS} — это около 1 минуты.`}
        primaryAction={{
          label: 'Продолжить',
          onClick: () => setShowExitModal(false)
        }}
        secondaryAction={{
          label: 'Позже',
          onClick: handleConfirmExit
        }}
      />
    </div>
  );
};
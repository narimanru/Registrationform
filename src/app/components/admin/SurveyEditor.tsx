import React, { useState } from 'react';
import { Edit2, Save, Plus, Trash2, MoveUp, MoveDown, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { SurveyQuestion, SURVEY_QUESTIONS } from '../../types/survey';

export const SurveyEditor: React.FC = () => {
  const [questions, setQuestions] = useState<SurveyQuestion[]>(SURVEY_QUESTIONS);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(new Set([1, 2, 3, 4, 5, 6, 7]));

  const toggleExpanded = (id: number) => {
    setExpandedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleSave = () => {
    setEditingId(null);
    // Here you would typically save to backend/localStorage
    console.log('Saving questions:', questions);
  };

  const handleAddOption = (questionId: number) => {
    setQuestions(prev => prev.map(q => {
      if (q.id === questionId && q.options) {
        return {
          ...q,
          options: [...q.options, { value: `new-${Date.now()}`, label: 'Новая опция' }]
        };
      }
      return q;
    }));
  };

  const handleRemoveOption = (questionId: number, optionValue: string) => {
    setQuestions(prev => prev.map(q => {
      if (q.id === questionId && q.options) {
        return {
          ...q,
          options: q.options.filter(opt => opt.value !== optionValue)
        };
      }
      return q;
    }));
  };

  const handleUpdateQuestion = (questionId: number, field: keyof SurveyQuestion, value: any) => {
    setQuestions(prev => prev.map(q => {
      if (q.id === questionId) {
        return { ...q, [field]: value };
      }
      return q;
    }));
  };

  const handleUpdateOption = (questionId: number, optionValue: string, field: 'label' | 'value' | 'description', newValue: string) => {
    setQuestions(prev => prev.map(q => {
      if (q.id === questionId && q.options) {
        return {
          ...q,
          options: q.options.map(opt => 
            opt.value === optionValue ? { ...opt, [field]: newValue } : opt
          )
        };
      }
      return q;
    }));
  };

  const moveQuestion = (questionId: number, direction: 'up' | 'down') => {
    setQuestions(prev => {
      const index = prev.findIndex(q => q.id === questionId);
      if (
        (direction === 'up' && index === 0) || 
        (direction === 'down' && index === prev.length - 1)
      ) {
        return prev;
      }
      
      const newQuestions = [...prev];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      [newQuestions[index], newQuestions[targetIndex]] = [newQuestions[targetIndex], newQuestions[index]];
      
      // Update IDs to match new positions
      return newQuestions.map((q, i) => ({ ...q, id: i + 1 }));
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Редактор опросника</h2>
          <p className="text-muted-foreground mt-1">Настройте вопросы и варианты ответов</p>
        </div>
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          Сохранить изменения
        </Button>
      </div>

      <div className="space-y-4">
        {questions.map((question, index) => {
          const isExpanded = expandedQuestions.has(question.id);
          const isEditing = editingId === question.id;

          return (
            <div key={question.id} className="bg-card rounded-xl border border-border overflow-hidden">
              {/* Question Header */}
              <div className="p-4 flex items-center gap-3 bg-muted/30">
                <button
                  onClick={() => toggleExpanded(question.id)}
                  className="p-1 hover:bg-secondary rounded transition-colors"
                >
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
                
                <div className="flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1 rounded-lg text-sm font-semibold">
                  Вопрос {question.id}
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{question.title}</h3>
                  <p className="text-sm text-muted-foreground">{question.description}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => moveQuestion(question.id, 'up')}
                    disabled={index === 0}
                    className="p-2 hover:bg-secondary rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Переместить вверх"
                  >
                    <MoveUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveQuestion(question.id, 'down')}
                    disabled={index === questions.length - 1}
                    className="p-2 hover:bg-secondary rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Переместить вниз"
                  >
                    <MoveDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setEditingId(isEditing ? null : question.id)}
                    className="p-2 hover:bg-secondary rounded transition-colors"
                    title="Редактировать"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Question Details */}
              {isExpanded && (
                <div className="p-6 space-y-6">
                  {/* Edit Mode */}
                  {isEditing ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          label="Заголовок вопроса"
                          value={question.title}
                          onChange={(e) => handleUpdateQuestion(question.id, 'title', e.target.value)}
                        />
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Тип вопроса
                          </label>
                          <select
                            value={question.type}
                            onChange={(e) => handleUpdateQuestion(question.id, 'type', e.target.value as any)}
                            className="w-full px-4 py-2 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                          >
                            <option value="single">Один вариант</option>
                            <option value="multiple">Несколько вариантов</option>
                            <option value="text">Текстовый ответ</option>
                            <option value="subquestions">Подвопросы</option>
                          </select>
                        </div>
                      </div>

                      <Input
                        label="Описание"
                        value={question.description}
                        onChange={(e) => handleUpdateQuestion(question.id, 'description', e.target.value)}
                      />

                      {question.tooltip && (
                        <Input
                          label="Подсказка (tooltip)"
                          value={question.tooltip}
                          onChange={(e) => handleUpdateQuestion(question.id, 'tooltip', e.target.value)}
                        />
                      )}
                    </>
                  ) : (
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Тип:</span>
                        <span className="ml-2 font-medium">
                          {question.type === 'single' && 'Один вариант'}
                          {question.type === 'multiple' && 'Несколько вариантов'}
                          {question.type === 'text' && 'Текстовый ответ'}
                          {question.type === 'subquestions' && 'Подвопросы'}
                        </span>
                      </div>
                      {question.tooltip && (
                        <div>
                          <span className="text-muted-foreground">Подсказка:</span>
                          <span className="ml-2 font-medium">{question.tooltip}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Options */}
                  {question.options && question.options.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-foreground">Варианты ответов</h4>
                        {isEditing && (
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleAddOption(question.id)}
                            className="flex items-center gap-2"
                          >
                            <Plus className="w-4 h-4" />
                            Добавить вариант
                          </Button>
                        )}
                      </div>

                      <div className="space-y-2">
                        {question.options.map((option) => (
                          <div
                            key={option.value}
                            className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
                          >
                            {option.icon && <span className="text-2xl">{option.icon}</span>}
                            
                            {isEditing ? (
                              <>
                                <Input
                                  placeholder="Значение"
                                  value={option.value}
                                  onChange={(e) => handleUpdateOption(question.id, option.value, 'value', e.target.value)}
                                  className="flex-1"
                                />
                                <Input
                                  placeholder="Текст"
                                  value={option.label}
                                  onChange={(e) => handleUpdateOption(question.id, option.value, 'label', e.target.value)}
                                  className="flex-1"
                                />
                                {option.description !== undefined && (
                                  <Input
                                    placeholder="Описание"
                                    value={option.description || ''}
                                    onChange={(e) => handleUpdateOption(question.id, option.value, 'description', e.target.value)}
                                    className="flex-1"
                                  />
                                )}
                                <button
                                  onClick={() => handleRemoveOption(question.id, option.value)}
                                  className="p-2 hover:bg-destructive/10 text-destructive rounded transition-colors"
                                  title="Удалить вариант"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </>
                            ) : (
                              <div className="flex-1">
                                <div className="font-medium text-foreground">{option.label}</div>
                                {option.description && (
                                  <div className="text-sm text-muted-foreground">{option.description}</div>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Subquestion info */}
                  {question.subQuestion && (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="text-sm font-semibold text-foreground mb-2">Условный подвопрос</h4>
                      <p className="text-sm text-muted-foreground mb-2">{question.subQuestion.title}</p>
                      <div className="text-xs text-muted-foreground">
                        Тип: {question.subQuestion.type === 'single' ? 'Один вариант' : 'Несколько вариантов'}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

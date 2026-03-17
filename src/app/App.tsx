import { RouterProvider } from 'react-router';
import { SurveyProvider } from './context/SurveyContext';
import { router } from './routes';
import { Toaster } from 'sonner';

export default function App() {
  return (
    <SurveyProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </SurveyProvider>
  );
}
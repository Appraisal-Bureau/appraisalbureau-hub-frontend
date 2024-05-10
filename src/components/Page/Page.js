import { usePage } from 'hooks/usePage';
import { useEffect, useMemo } from 'react';
import { endLoading, startLoading } from 'services/nprogress';

const Page = ({ children }) => {
  const { onLoad } = usePage();
  const render = useMemo(() => {
    return <>{children}</>;
  }, [children]);

  useEffect(() => {
    onLoad(render);
  }, [onLoad, render]);

  useEffect(() => {
    endLoading();
    return () => startLoading();
  }, []);

  return render;
};

export default Page;

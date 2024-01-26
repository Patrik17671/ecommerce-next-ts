import Sidebar from '@/components/cart/sidebar/Sidebar';

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={'container !py-10 md:!py-20'}>
      <h1 className={'text-center'}>Košík</h1>
      <div className={'flex flex-col-reverse md:grid grid-cols-12'}>
        <div className={'md:col-span-8'}>{children}</div>
        <div className={'md:col-span-4'}>
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

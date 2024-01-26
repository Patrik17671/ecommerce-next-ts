import { getCollections } from '@/app/api/fetches/getCollections';
import ConsoleLog from '@/utils/consoleLog';
import Items from '@/components/thxPage/Items';
import styles from './page.module.scss';

const Page = async ({ params }: { params: { cartHash: string } }) => {
  const orderData = await getCollections({
    slug: 'orders',
    filters: { cartHash: { value: params.cartHash, operator: 'equals' } },
  });

  let order;

  if (orderData.docs && orderData.docs.length > 0) {
    order = orderData.docs[0];
  }
  return (
    <div className={'container py-12 md:py-28'}>
      <div>
        <h1 className={styles.title}>Ďakujeme za objednácku č.{order.id}</h1>
        <div className={styles.content}>
          <div className={styles.parameters}>
            <div className={'mt-8 md:mt-0'}>
              <h4>Údaje</h4>
              <span>
                Meno:
                <strong>
                  {' '}
                  {order.deliveryAddress.name} {order.deliveryAddress.lastName}
                </strong>
              </span>
              <span>
                Email: <strong>{order.deliveryAddress.email}</strong>
              </span>
              <span>
                Telefón: <strong>{order.deliveryAddress.phone}</strong>
              </span>
              <span>
                Mesto: <strong>{order.deliveryAddress.town}</strong>
              </span>
            </div>
            <div>
              <span>
                Platba:{' '}
                <strong>
                  {order.selectedPayment.name} {order.selectedPayment.price}€
                </strong>
              </span>
              <span>
                Doprava:{' '}
                <strong>
                  {order.selectedDelivery.name} {order.selectedDelivery.price}€
                </strong>
              </span>
              <span>
                Cena dokopy: <strong>{order.totalPrice} €</strong>
              </span>
            </div>
          </div>
          <Items items={order.items} />
        </div>
      </div>
    </div>
  );
};
export default Page;

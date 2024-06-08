import Address from "./Address";
import Order from "./Order";

interface Shipment {
    id: string;
    address: Address;
    order: Order;
    status: string;
    trackingNumber: string;
    shippedAt: Date;
    deliveredAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

export default Shipment;

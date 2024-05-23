import { getIP } from "../informacion/Constants";


const API_URL = `http://${getIP()}`;


export const fetchUserOrders = async(userId) => {
    try {
        const response = await fetch(`${API_URL}/users/${userId}/bought`);
        const data = await response.json();
        if (response.ok) {
            console.log(data.data);
            const groupedData = groupOrdersBySellerAndTime(data.data);
            console.log(groupedData);
            return groupedData;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error("Failed to fetch user orders: ", error);
        throw error;
    }
}

const groupOrdersBySellerAndTime = (data) => {
    const parseDate = (dateStr) => new Date(dateStr);
    const withinTimeRange = (date1, date2, rangeInMilliseconds) =>
        Math.abs(date1 - date2) <= rangeInMilliseconds;

    const groupedData = {};

    data.forEach((item) => {
        const seller = item.seller.productor_name;
        const boughtAt = parseDate(item.bought_at);

        if (!groupedData[seller]) {
            groupedData[seller] = [];
        }

        let groupFound = false;
        for (const group of groupedData[seller]) {
            if (withinTimeRange(group[0].bought_at, boughtAt, 3 * 60 * 1000)) {
                group.push({ ...item, bought_at: boughtAt });
                groupFound = true;
                break;
            }
        }

        if (!groupFound) {
            groupedData[seller].push([{ ...item, bought_at: boughtAt }]);
        }
    });

    // Ordenar los grupos por la fecha más reciente
    for (const seller in groupedData) {
        groupedData[seller].sort((a, b) => {
            const dateA = new Date(a[0].bought_at);
            const dateB = new Date(b[0].bought_at);
            return dateB - dateA;
        });
    }

    return groupedData;
};

export const fetchUserBoughtProducts = async (userId) => {
    try {
        const response = await fetch(`${API_URL}/users/${userId}/bought`);
        const data = await response.json();
        console.log(data);
        if (response.ok) {
            const latestPurchases = getLatestPurchases(data.data);
            console.log('latestPurchases: ', latestPurchases);
            return latestPurchases;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error("Failed to fetch user bought products: ", error);
        throw error;
    }
};

const getLatestPurchases = (data) => {
    const parseDate = (dateStr) => new Date(dateStr);
    const latestPurchases = {};

    data.forEach((item) => {
        const productId = item.product.id;
        const boughtAt = parseDate(item.bought_at);

        if (!latestPurchases[productId] || boughtAt > parseDate(latestPurchases[productId].bought_at)) {
            latestPurchases[productId] = { ...item, bought_at: boughtAt };
        }
    });

    // Convert object to array sorted by the latest purchase date
    const sortedLatestPurchases = Object.values(latestPurchases).sort((a, b) => b.bought_at - a.bought_at);
    return sortedLatestPurchases;
};

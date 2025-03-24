export function formatearDinero(monto) {
    if (typeof monto !== 'number') {
        return monto;
    }

    return monto.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
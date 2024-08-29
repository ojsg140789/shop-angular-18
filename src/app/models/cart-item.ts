export interface CartItem {
    id?: string,
    codigo: string,
    descripcion: string,
    precio: number,
    imagen: string,
    stock: number,
    tiendaId: number,
    quantity: 1
}

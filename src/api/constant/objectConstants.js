/**
 * Created by Tharuka Jayalath on 05/29/2018
 */

module.exports = {
    EMAIL: 'email',
    CONTACT_NUMBER: 'contactNumber',
    NAME: 'name',
    ADDRESS: 'address',
    NEXT_ORDER_ID: 'nextOrderId',
    ORDER_ID: 'orderId',
    ORDER_NAME: 'orderName',
    ORDER_STATUS: 'orderStatus',
    USER_EDITABLE: 'userEditable',
    ESTIMATED_PRICE: 'estimatedPrice',
    ACTUAL_PRICE: 'actualPrice',
    REQUIRED_DATE: 'requiredDate',
    CREATED_DATE_TS: 'createdTimeStamp',
    ITEM_ID: 'itemId',
    ITEM_NAME: 'itemName',
    QUANTITY: 'quantity',
    DESCRIPTION: 'description',
    ITEMS: 'items',
    CUSTOMERS_TABLE:'CUSTOMERS',
    ORDERS_TABLE: 'ORDERS',
    ORDER_STATUS_TABLE: 'ORDER_STATUS',
    ORDER_STATUS_NAME: 'name',
    ORDER_STATUS_ID: 'id',
    ID: '_id',
    CUSTOMERS_COLLECTION : 'customers',
    ORDERS_COLLECTION : 'orders',
    CLIENT: 'client',
    MOBILE_CLIENT: 'mobile',
    ADMIN_CLIENT: 'admin_portal'
};

/**
 * Order object format
 */

/*
{
    orderName: 'name of the order',
    requiredDate: 'requiredDate',
    createdTimeStamp: 'createdTimeStamp',
    items: [{name: 'name of the item', quantity: 'item quantity', description: 'item description'},{},{}]
}
*/

/**
 * update object format
 */

/*

{

    updated: [{itemId: 'item id',name: 'name of the item', quantity: 'item quantity', description: 'item description'},{}],
    deleted: [{itemId:'item_id'}],
    newentries: [{itemId: 'item id', name: 'name of the item'}],//all the fields in the item
    orderChanges: [{orderName: 'name of the order'},{requiredDate: 'requireddate'}]

}
*/


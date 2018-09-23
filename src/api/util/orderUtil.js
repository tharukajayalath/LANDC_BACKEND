/**
 * Created by Tharuka Jayalath on 08/05/2018
 */

module.exports = {
  calculateOrderReadyDate: (orderCreatedTime)=>{

      let orderReadyDate = orderCreatedTime.day();

      switch (orderReadyDate) {
          case 0:
              orderReadyDate = orderCreatedTime.day(7);
              break;
          case 1:
              orderReadyDate = orderCreatedTime.day(6);
              break;
          case 2:
              orderReadyDate = orderCreatedTime.day(5);
              break;
          case 3:
              orderReadyDate = orderCreatedTime.day(4);
              break;
          case 4:
              orderReadyDate = orderCreatedTime.day(3);
              break;

          case 5:
              orderReadyDate = orderCreatedTime.day(2);
              break;

          case 6://TODO: additional logic need to add here
              orderReadyDate = orderCreatedTime.day(1);
              break;

          default:
      }
      return orderReadyDate.format('YYYY-MM-DD');
  }

};

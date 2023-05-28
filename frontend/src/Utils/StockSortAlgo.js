const StockSortAlgo = (sortMethod,Data,NewData) => {

    switch (sortMethod) {
        case "name":
          NewData = Data.sort((a, b) => {
            let fa = a.name.toLowerCase(),
              fb = b.name.toLowerCase();
    
            if (fa < fb) {
              return -1;
            }
            if (fa > fb) {
              return 1;
            }
            return 0;
          });
          break;
        //   
        case "date":
          NewData = Data.sort((a, b) => {
            let da = new Date(a.expiry),
              db = new Date(b.expiry);
            return da - db;
          });
          break;
    // 
        case "batch":
          NewData = Data.sort((a, b) => {
            let fa = a.batch.toLowerCase(),
              fb = b.batch.toLowerCase();
    
            if (fa < fb) {
              return -1;
            }
            if (fa > fb) {
              return 1;
            }
            return 0;
          });
          break;
    // 
        case "hsn":
          NewData = Data.sort((a, b) => {
            return a.hsn - b.hsn;
          });
    
          break;
    
        default:
          break;
      }

}

export default StockSortAlgo

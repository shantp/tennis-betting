import DataFilter from "../../src/common/data_filter";

let data = require("../../src/2014.json");

describe("DataFilter", function() {
  describe("getResults", function() {
    it("will return a results object", function() {
      expect(DataFilter.getResults(data)).to.deep.equal({
        amount: 1632.29,
        win: 98,
        loss: 94,
        push: 3,
        roi: 7.086
      });
    });
  });

  describe("getResultsByType", function(){
    it("will return a results object organized by type", function() {
      expect(DataFilter.getResultsByType(data)).to.deep.equal({
        future: {amount: -665.35, win: 0, loss: 7, push: 0, roi: -100},
        ml: {amount: 2589.75, win: 69, loss: 59, push: 0, roi: 16.476},
        parlay: {amount: 416.89, win: 11, loss: 6, push: 0, roi: 20.648},
        prop: {amount: 225, win: 2, loss: 0, push: 0, roi: 132.353},
        spread: {amount: -783, win: 5, loss: 11, push: 3, roi: -38.084},
        total: {amount: -151, win: 11, loss: 11, push: 0, roi: -6.271}
      });
    });
  });
});
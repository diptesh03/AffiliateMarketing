const amazonPaapi = require('amazon-paapi');
const Product = require('../models/product.model')

const commonParameters = {
    AccessKey: 'AKIAJOVNJVD6IRBWX6XQ',
    SecretKey: 'SQmJuoyyTn/9VXOaD0+SHafVJv2gw/xalC8aib8R',
    PartnerTag: 'suppwiki24-21', // yourtag-20
    PartnerType: 'Associates', // Default value is Associates.
    Marketplace: 'www.amazon.de', // Default value is US. Note: Host and Region are predetermined based on the marketplace value. There is no need for you to add Host and Region as soon as you specify the correct Marketplace value. If your region is not US or .com, please make sure you add the correct Marketplace value.
  };


//   "BrowseNodeInfo.BrowseNodes",
//   "BrowseNodeInfo.BrowseNodes.Ancestor",
//   "BrowseNodeInfo.BrowseNodes.SalesRank",
//   "BrowseNodeInfo.WebsiteSalesRank",
//   "CustomerReviews.Count",
//   "CustomerReviews.StarRating",
//   "Images.Primary.Small",
//   "Images.Primary.Medium",
//   "Images.Primary.Large",
//   "Images.Variants.Small",
//   "Images.Variants.Medium",
//   "Images.Variants.Large",
//   "ItemInfo.ByLineInfo",
//   "ItemInfo.ContentInfo",
//   "ItemInfo.ContentRating",
//   "ItemInfo.Classifications",
//   "ItemInfo.ExternalIds",
//   "ItemInfo.Features",
//   "ItemInfo.ManufactureInfo",
//   "ItemInfo.ProductInfo",
//   "ItemInfo.TechnicalInfo",
//   "ItemInfo.Title",
//   "ItemInfo.TradeInInfo",
//   "Offers.Listings.Availability.MaxOrderQuantity",
//   "Offers.Listings.Availability.Message",
//   "Offers.Listings.Availability.MinOrderQuantity",
//   "Offers.Listings.Availability.Type",
//   "Offers.Listings.Condition",
//   "Offers.Listings.Condition.ConditionNote",
//   "Offers.Listings.Condition.SubCondition",
//   "Offers.Listings.DeliveryInfo.IsAmazonFulfilled",
//   "Offers.Listings.DeliveryInfo.IsFreeShippingEligible",
//   "Offers.Listings.DeliveryInfo.IsPrimeEligible",
//   "Offers.Listings.DeliveryInfo.ShippingCharges",
//   "Offers.Listings.IsBuyBoxWinner",
//   "Offers.Listings.LoyaltyPoints.Points",
//   "Offers.Listings.MerchantInfo",
//   "Offers.Listings.Price",
//   "Offers.Listings.ProgramEligibility.IsPrimeExclusive",
//   "Offers.Listings.ProgramEligibility.IsPrimePantry",
//   "Offers.Listings.Promotions",
//   "Offers.Listings.SavingBasis",
//   "Offers.Summaries.HighestPrice",
//   "Offers.Summaries.LowestPrice",
//   "Offers.Summaries.OfferCount",
//   "ParentASIN",
//   "RentalOffers.Listings.Availability.MaxOrderQuantity",
//   "RentalOffers.Listings.Availability.Message",
//   "RentalOffers.Listings.Availability.MinOrderQuantity",
//   "RentalOffers.Listings.Availability.Type",
//   "RentalOffers.Listings.BasePrice",
//   "RentalOffers.Listings.Condition",
//   "RentalOffers.Listings.Condition.ConditionNote",
//   "RentalOffers.Listings.Condition.SubCondition",
//   "RentalOffers.Listings.DeliveryInfo.IsAmazonFulfilled",
//   "RentalOffers.Listings.DeliveryInfo.IsFreeShippingEligible",
//   "RentalOffers.Listings.DeliveryInfo.IsPrimeEligible",
//   "RentalOffers.Listings.DeliveryInfo.ShippingCharges",
//   "RentalOffers.Listings.MerchantInfo"

module.exports = {

    searchItems: (req, res) => {
        const Keywords = req.query.Keywords;
        const SearchIndex = req.query.SearchIndex;
        const count = req.query.count;
    
        const requestParameters = {
            Keywords,
            SearchIndex,
            ItemCount: Number(count),
            Resources: [
                "BrowseNodeInfo.BrowseNodes",
                "BrowseNodeInfo.BrowseNodes.Ancestor",
                "BrowseNodeInfo.BrowseNodes.SalesRank",
                "BrowseNodeInfo.WebsiteSalesRank",
                "CustomerReviews.Count",
                "CustomerReviews.StarRating",
                "Images.Primary.Small",
                "Images.Primary.Medium",
                "Images.Primary.Large",
                "Images.Variants.Small",
                "Images.Variants.Medium",
                "Images.Variants.Large",
                "ItemInfo.ByLineInfo",
                "ItemInfo.ContentInfo",
                "ItemInfo.ContentRating",
                "ItemInfo.Classifications",
                "ItemInfo.ExternalIds",
                "ItemInfo.Features",
                "ItemInfo.ManufactureInfo",
                "ItemInfo.ProductInfo",
                "ItemInfo.TechnicalInfo",
                "ItemInfo.Title",
                "ItemInfo.TradeInInfo",
                "Offers.Listings.Availability.MaxOrderQuantity",
                "Offers.Listings.Availability.Message",
                "Offers.Listings.Availability.MinOrderQuantity",
                "Offers.Listings.Availability.Type",
                "Offers.Listings.Condition",
                "Offers.Listings.Condition.ConditionNote",
                "Offers.Listings.Condition.SubCondition",
                "Offers.Listings.DeliveryInfo.IsAmazonFulfilled",
                "Offers.Listings.DeliveryInfo.IsFreeShippingEligible",
                "Offers.Listings.DeliveryInfo.IsPrimeEligible",
                "Offers.Listings.DeliveryInfo.ShippingCharges",
                "Offers.Listings.IsBuyBoxWinner",
                "Offers.Listings.LoyaltyPoints.Points",
                "Offers.Listings.MerchantInfo",
                "Offers.Listings.Price",
                "Offers.Listings.ProgramEligibility.IsPrimeExclusive",
                "Offers.Listings.ProgramEligibility.IsPrimePantry",
                "Offers.Listings.Promotions",
                "Offers.Listings.SavingBasis",
                "Offers.Summaries.HighestPrice",
                "Offers.Summaries.LowestPrice",
                "Offers.Summaries.OfferCount",
                "ParentASIN",
                "RentalOffers.Listings.Availability.MaxOrderQuantity",
                "RentalOffers.Listings.Availability.Message",
                "RentalOffers.Listings.Availability.MinOrderQuantity",
                "RentalOffers.Listings.Availability.Type",
                "RentalOffers.Listings.BasePrice",
                "RentalOffers.Listings.Condition",
                "RentalOffers.Listings.Condition.ConditionNote",
                "RentalOffers.Listings.Condition.SubCondition",
                "RentalOffers.Listings.DeliveryInfo.IsAmazonFulfilled",
                "RentalOffers.Listings.DeliveryInfo.IsFreeShippingEligible",
                "RentalOffers.Listings.DeliveryInfo.IsPrimeEligible",
                "RentalOffers.Listings.DeliveryInfo.ShippingCharges",
                "RentalOffers.Listings.MerchantInfo"
            ],
          };
    
          amazonPaapi
            .SearchItems(commonParameters, requestParameters)
            .then((data) => {
                // do something with the success response.
                res.send(data)
            })
            .catch((error) => {
                // catch an error.
                console.log(error);
                res.send(error)
            });
    },
    
    categories: async(req, res) => {
        const [categories, _] = await Product.getAllCategories()

        function getChildren (arr, id) {
            return arr.reduce((acc, value) => {
                if(value.parent_id == id) {
                    let data = {
                        ...value
                    }
                    data['children'] = getChildren(categories.filter(e => e.id != value.id), value.id);
                    acc.push(data)
                }
                return acc
            }, [])
        }
        
        
        let array = categories.reduce((acc, value) => {
            if(!value.parent_id) {
                let data = {
                    ...value
                }
                data['children'] = getChildren(categories.filter(e => e.id != value.id), value.id);
                acc.push(data)
            }
            return acc
        }, [])

        res.send(array)

    }
}
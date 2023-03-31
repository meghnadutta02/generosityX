import React from "react";
import { Link } from "react-router-dom";
import { products } from "../CampaignsDB.js";

export default function CampaignCarousel() {
  return (
    <>
      <div name="campaigns" className="py-8">
        <h2 className="text-4xl font-bold  inline border-b-4 border-blue-600 tracking-tight text-gray-900">
          Campaigns
        </h2>

        <div className="mt-4 p-8 flex overflow-x-auto">
          {products.slice(0, 5).map((product) => (
            <div
              className="bg-purple-300 rounded-md mr-4 hover:border-2 hover:border-black min-h-50 shadow-lg shadow-blue-600 hover:scale-110 transition ease-in-out delay-50"
              key={product.id}
            >
              <Link to={`/campaigns/${product.id}`}>
                <div className="min-h-80 w-full overflow-hidden p-4">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-50 w-full object-cover object-center rounded-md"
                  />
                </div>
                <div className="p-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <span aria-hidden="true" className="absolute" />
                      {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.color}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {product.price}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mb-24">
        <Link to="/campaigns">
          <div className="text-sm font-medium hover:bg-pink-300 border-2 border-red-400 rounded-md p-2">
            View All Campaigns
          </div>
        </Link>
      </div>
    </>
  );
}

type addressComponentTypes =
  | "administrative_area_level_1"
  | "administrative_area_level_2"
  | "administrative_area_level_3"
  | "administrative_area_level_4"
  | "administrative_area_level_5"
  | "archipelago"
  | "colloquial_area"
  | "continent"
  | "country"
  | "establishment"
  | "finance"
  | "floor"
  | "food"
  | "general_contractor"
  | "geocode"
  | "health"
  | "intersection"
  | "landmark"
  | "locality"
  | "natural_feature"
  | "neighborhood"
  | "place_of_worship"
  | "plus_code"
  | "point_of_interest"
  | "political"
  | "post_box"
  | "postal_code"
  | "postal_code_prefix"
  | "postal_code_suffix"
  | "postal_town"
  | "premise"
  | "room"
  | "route"
  | "street_address"
  | "street_number"
  | "sublocality"
  | "sublocality_level_1"
  | "sublocality_level_2"
  | "sublocality_level_3"
  | "sublocality_level_4"
  | "sublocality_level_5"
  | "subpremise"
  | "town_square";

type result = {
  address_components: [
    {
      long_name: string;
      short_name: string;
      types: addressComponentTypes[];
    },
    {
      long_name: string;
      short_name: string;
      types: addressComponentTypes[];
    },
    {
      long_name: string;
      short_name: string;
      types: addressComponentTypes[];
    },
    {
      long_name: string;
      short_name: string;
      types: addressComponentTypes[];
    },
    {
      long_name: string;
      short_name: string;
      types: addressComponentTypes[];
    }
  ];
  formatted_address: string;
  geometry: {
    bounds: {
      northeast: {
        lat: number;
        lng: number;
      };
      southwest: {
        lat: number;
        lng: number;
      };
    };
    location: {
      lat: number;
      lng: number;
    };
    location_type:
      | "ROOFTOP"
      | "APPROXIMATE"
      | "RANGE_INTERPOLATED"
      | "GEOMETRIC_CENTER";
    viewport: {
      northeast: {
        lat: number;
        lng: number;
      };
      southwest: {
        lat: number;
        lng: number;
      };
    };
  };
  place_id: string;
  types: addressComponentTypes[];
};

export interface GeocodeResults {
  results: result[];
  status:
    | "OK"
    | "ZERO_RESULTS"
    | "OVER_QUERY_LIMIT"
    | "REQUEST_DENIED"
    | "INVALID_REQUEST"
    | "UNKNOWN_ERROR";
}

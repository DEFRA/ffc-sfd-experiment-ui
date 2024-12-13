@rps-247
Feature: GRH1 Action
  As a Farmer
  I want to be able to apply funding for GRH1 using Rural Payments Service

  Scenario Outline: Sarah applies for GRH1 successfully to all or part of available area on her farm
    Given Sarah is on the Rural Payments Service login page
    When Sarah is eligible to apply for funding
    And Sarah selects the land parcel type of Permanent Grassland Below Moorland
    And she chooses to apply for <action> for <available area> hectares
    Then Sarah is shown <payment amount> she will receive for this <action>

    Examples:
    | action | available area | payment amount |
    | GRH1   | 4.2            | 508.20         |
    | GRH1   | 11.0308        | 1334.73         |

  @negative-grh1
  Scenario Outline: Sarah is not able to apply for <action> when parcel type is Permanent Grassland Above Moorland
    Given Sarah is on the Rural Payments Service login page
    When Sarah is eligible to apply for funding
    And Sarah selects the land parcel type of Permanent Grassland Above Moorland
    And she chooses to apply for <action> for 3.8383 hectares
    Then Sarah is shown the error message that land parcel is above the moorland line

    Examples:
      | action |
      | GRH1   |

  @negative-grh1
  Scenario: Sarah is not able to apply for GRH1 when parcel type is below 2ha
    Given Sarah is on the Rural Payments Service login page
    When Sarah is eligible to apply for funding
    And Sarah selects the land parcel type of Tiny Permanent Grassland Below Moorland
    And she chooses to apply for GRH1 for 0.0020 hectares
    Then Sarah is shown the error message that the area is below the minimum requirement
Feature: SAM1 Action
  As a Farmer
  I want to be able to apply funding for SAM1 using Rural Payments Service

  Scenario Outline: Sarah applies for <action> successfully with available area on her farm
    Given Sarah is on the Rural Payments Service login page
    When Sarah is eligible to apply for funding
    And Sarah selects the land parcel type of <parcel>
    And she chooses to apply for <action> for <available area> hectares
    Then Sarah is shown <payment amount> she will receive for this <action>

    Examples:
      | action | parcel                             | available area | payment amount |
      | SAM1   | Arable                             | 3.0584         | 112.74         |
      | SAM1   | Permanent Grassland Below Moorland | 11.0308        | 158.98         |
@rps-242
Feature: CSAM1 Action
  As a Farmer
  I want to be able to apply funding for CSAM1 using Rural Payments Service

  Scenario Outline: Sarah applies for CSAM1 successfully with available area on her farm
    Given Sarah is on the Rural Payments Service login page
    When Sarah is eligible to apply for funding
    And Sarah selects the land parcel type of <parcel>
    And she chooses to apply for <action> for <available area> hectares
    Then Sarah is shown <payment amount> she will receive for this <action>

    Examples:
      | action | parcel              | available area | payment amount |
      | CSAM1  | Arable              | 8.4            | 147.40         |
      | CSAM1  | Permanent Grassland | 4.2            | 122.20         |

  @negative
  Scenario Outline: Sarah applies for CSAM1 but not for all the available area on the land parcel
    Given Sarah is on the Rural Payments Service login page
    When Sarah is eligible to apply for funding
    And Sarah selects the land parcel type of Arable
    And she chooses to apply for <action> for <available area> hectares
    Then Sarah is shown the error message that the area applied for does not match the land parcel area

    Examples:
        | action | available area |
        | CSAM1  | 4.2            |
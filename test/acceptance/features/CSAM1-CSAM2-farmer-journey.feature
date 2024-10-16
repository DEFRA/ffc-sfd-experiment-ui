@rps-242 @rps-243
Feature: CSAM1 and CSAM2 2024 SFI actions
  As a Farmer / Agent
  I should be able to apply funding for CSAM1 and CSAM2 using Rural Payments Service

  Scenario Outline: Sarah applies for <action> successfully with available area on her farm
    Given Sarah is on the Rural Payments Service login page
    When Sarah is eligible to apply for funding
    And Sarah selects the land parcel type of <parcel>
    And she chooses to apply for <action> for <available area> hectares
    Then Sarah is shown <payment amount> she will receive for this <action>

    Examples:
      | action | parcel              | available area | payment amount |
      | CSAM1  | Arable              | 8.4            | 147.40         |
      | CSAM1  | Permanent Grassland | 4.2            | 122.20         |
      | CSAM2  | Arable              | 2.75           | 354.75         |

  @negative
  Scenario: Sarah applies for CSAM1 but not for all the available area on the land parcel
    Given Sarah is on the Rural Payments Service login page
    When Sarah is eligible to apply for funding
    And Sarah selects the land parcel type of Arable
    And she chooses to apply for CSAM1 for 4.2 hectares
    Then Sarah is shown the error message that the area applied for does not match the land parcel area

  @negative
  Scenario: Sarah is not shown CSAM2 as an action to apply for when the land parcel type is Permanent Grassland
    Given Sarah is on the Rural Payments Service login page
    When Sarah is eligible to apply for funding
    And Sarah selects the land parcel type of Permanent Grassland
    Then Sarah is not shown CSAM2 as an action to apply for
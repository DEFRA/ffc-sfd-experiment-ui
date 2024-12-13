@rps-242 @rps-243 @rps-244 @rps-247
Feature: CSAM and CLIG 2024 SFI actions
  As a Farmer / Agent
  I should be able to apply funding for CSAM1 and CSAM2 using Rural Payments Service

  Scenario Outline: Sarah applies for <action> successfully with available area on her farm
    Given Sarah is on the Rural Payments Service login page
    When Sarah is eligible to apply for funding
    And Sarah selects the land parcel type of <parcel>
    And she chooses to apply for <action> for <available area> hectares
    Then Sarah is shown <payment amount> she will receive for this <action>

    Examples:
      | action | parcel                             | available area | payment amount |
      | CSAM1  | Arable                             | 3.0584         | 115.35         |
      | CSAM1  | Permanent Grassland Below Moorland | 11.0308        | 163.18         |
      | CSAM3  | Permanent Grassland Below Moorland | 11.0308        | 4213.77        |
      | CSAM3  | Permanent Grassland Below Moorland | 2.00           | 764            |
      | CLIG3  | Permanent Grassland Below Moorland | 11.0308        | 1665.65        |

  @negative
  Scenario: Sarah applies for CSAM1 but not for all the available area on the land parcel
    Given Sarah is on the Rural Payments Service login page
    When Sarah is eligible to apply for funding
    And Sarah selects the land parcel type of Permanent Grassland Below Moorland
    And she chooses to apply for CSAM1 for 4.2 hectares
    Then Sarah is shown the error message that the area applied for does not match the land parcel area

  @negative
  Scenario Outline: Sarah is not shown CSAM2 as an action to apply for when the land parcel type is Permanent Grassland
    Given Sarah is on the Rural Payments Service login page
    When Sarah is eligible to apply for funding
    And Sarah selects the land parcel type of <parcel>
    Then Sarah is not shown CSAM2 as an action to apply for

    Examples:
      | parcel                             |
      | Permanent Grassland Below Moorland |
      | Permanent Grassland Above Moorland |

  @negative
  Scenario Outline: Sarah is not able to apply for <action> when parcel type is Permanent Grassland Above Moorland
    Given Sarah is on the Rural Payments Service login page
    When Sarah is eligible to apply for funding
    And Sarah selects the land parcel type of Permanent Grassland Above Moorland
    And she chooses to apply for <action> for 3.8383 hectares
    Then Sarah is shown the error message that land parcel is above the moorland line

    Examples:
      | action |
      | CSAM1  |
      | CSAM3  |
      | CLIG3  |
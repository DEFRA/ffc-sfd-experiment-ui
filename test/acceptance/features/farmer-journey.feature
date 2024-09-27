Feature: Farmer Journey
  As a Farmer
  I want to be able to apply for funding using Rural Payments Service


  Scenario: Sarah applies for Land Parcel which is Arable and land use is spring wheat(AC32)
     Given Sarah is on the Rural Payments Service login page
     When Sarah is eligible to apply for funding
     And Sarah selects the land parcel type of Arable
     Then she chooses to apply for SAM1 for 8.4 hectares
     And Sarah is shown 48.72 she will receive for this SAM1

  Scenario: Sarah applies for Land Parcel which is Permanent Grassland and use is Permanent Grassland(PG01)
    Given Sarah is on the Rural Payments Service login page
    When Sarah is eligible to apply for funding
    And Sarah selects the land parcel type of Permanent Grassland
    Then she chooses to apply for SAM1 for 4.2 hectares
    And Sarah is shown 24.36 she will receive for this SAM1

  Scenario: Jim applies for Land Parcel where there is an existing agreement in place
    Given Jim is on the Rural Payments Service login page
    When Jim is eligible to apply for funding
    And Jim selects the land parcel type of Arable
    Then he chooses to apply for SAM1 for 20 hectares
    And Jim is shown 116.00 she will receive for this SAM1

  Scenario Outline: Sarah applies for GRH1 successfully with available area on her farm
    Given Sarah is on the Rural Payments Service login page
    When Sarah is eligible to apply for funding
    And Sarah selects the land parcel type of Permanent Grassland
    And the <action> has the <minimum> and <maximum> hectare requirement
    And she chooses to apply for <action> for <available area> hectares
    Then Sarah is shown <payment amount> she will receive for this <action>

    Examples:
      | action | minimum | maximum | available area | payment amount |
      | GRH1   | 2       | 25      | 4.2            | 508.20         |

  @negative
  Scenario Outline: Sarah applies for GRH1 with hectares below the minimum requirement of available area
    Given Sarah is on the Rural Payments Service login page
    When Sarah is eligible to apply for funding
    And Sarah selects the land parcel type of Permanent Grassland
    And the <action> has the <minimum> and <maximum> hectare requirement
    And she chooses to apply for <action> for <available area> hectares
    Then Sarah is shown the error message that the area is below the minimum requirement

    Examples:
      | action | minimum | maximum | available area |
      | GRH1   | 15      | 25      | 4.2            |
@rps-215
Feature: GRH1 Action
  As a Farmer
  I want to be able to apply funding for GRH1 using Rural Payments Service

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

  @negative-grh1
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
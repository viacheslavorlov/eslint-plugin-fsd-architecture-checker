/**
 * @fileoverview checks if modules imported according to FSD rules
 * @author viacheslav orlov
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/import-path-checker"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("import-path-checker", rule, {
  valid: [
    // give me some code that won't trigger a warning
  ],

  invalid: [
    {
      code: "thiswillfail",
      errors: [{ message: "Fill me in.", type: "Me too" }],
    },
  ],
});

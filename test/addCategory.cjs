// const { Builder, By, Key } = require('selenium-webdriver');
// const safari = require('selenium-webdriver/safari');

// (async function addCategory() {
//   // Configure Safari options
//   let safariOptions = new safari.Options();

//   // Start the WebDriver and open the web page
//   let driver = await new Builder()
//     .forBrowser('safari')
//     .setSafariOptions(safariOptions)
//     .build();

const { Builder, By, Key, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

(async function example() {
  // Configure Firefox options
  let firefoxOptions = new firefox.Options();

  // Uncomment this line if you want to run Firefox in headless mode
  // firefoxOptions.headless();

  // Start the WebDriver and open the web page
  let driver = await new Builder()
    .forBrowser('firefox')
    .setFirefoxOptions(firefoxOptions)
    .build();

  await driver.get('http://localhost:8087/categories');

  try {
    // Find the input field for adding categories
    let inputField = await driver.findElement(By.css('[placeholder="Enter category name"]'));

    // Add a new category
    let newCategoryName = 'test';
    await inputField.sendKeys(newCategoryName, Key.RETURN);

    // Wait for the category to be added
    await driver.sleep(4000); // Adjust the time according to your app's responsiveness

    // Click the button to save the category
    
    let saveButton = await driver.findElement(By.xpath('//*[@id="root"]/div[4]/div[2]/button'));
    await saveButton.click();

    // Verify if the category has been added successfully
    //*[@id="root"]/div[1]/div/div/div[2]/div/b
    let element = await driver.findElement(By.xpath('go2072408551'));
    await driver.sleep(1000);
    let text = await element.getText();
    let categoryAdded = false;
    if (text === newCategoryName) {
      categoryAdded = true;
      console.log("Category was added successfully");
    }

    // Assertion
    if (!categoryAdded) {
      throw new Error('Category not added successfully!');
    }
  } catch (e) {
    console.log(e);
  } finally {
    // Close the browser
    await driver.quit();
  }
})();

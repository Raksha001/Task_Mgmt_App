const { Builder, By, Key } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

(async function addTask() {
  // Configure Firefox options
  let firefoxOptions = new firefox.Options();

  // Uncomment this line if you want to run Firefox in headless mode
  // firefoxOptions.headless();

  // Start the WebDriver and open the web page
  let driver = await new Builder()
    .forBrowser('firefox')
    .setFirefoxOptions(firefoxOptions)
    .build();
  
  await driver.get('http://localhost:8087/add');

  try {
    // Find the input field for adding tasks
    let inputField = await driver.findElement(By.css('[placeholder="Enter task name"]'));

    // Add a new task
    let newTaskName = 'Test Task';
    await inputField.sendKeys(newTaskName, Key.RETURN);

    // Wait for the task to be added
    await driver.sleep(1000); // Adjust the time according to your app's responsiveness

    // Click the button to submit the task
    let submitButton = await driver.findElement(By.xpath('//*[@id="root"]/div[4]/button'));
    await submitButton.click();


    // Verify if the task has been added successfully
    let element = await driver.findElement(By.className('css-18hlvm3'));
    let text = await element.getText();
    let taskAdded = false;
   if(text===newTaskName){
      taskAdded = true;
      console.log("Task was added successfully");
    }

    // Assertion
    if (!taskAdded) {
      throw new Error('Task not added successfully!');
    }
  }
  catch(e){
    console.log(e);
  }
   finally {
    // Close the browser
    await driver.quit();
  }
})();

const { Builder, By, Key, until, Browser } = require('selenium-webdriver');
const edge = require('selenium-webdriver/edge');

(async function example() {
    let edgeOptions = new edge.Options();
    let driver = await new Builder()
      .forBrowser('MicrosoftEdge')
      .setEdgeOptions(edgeOptions)
      .build();
    
     await driver.get('http://localhost:5173/');
    let addBtn = await  driver.findElement(By.xpath("//body/div[@id='root']/button[1]/*[1]"));
    await addBtn.click();
    //calling the create task to create a new task
    await createTask(driver, "GYM", "Maintain Physical health", 5);
    //calling the search task to search any task
    await searchTask(driver,"GYM");
    
  })();

  async function createTask(driver, taskName, descName, categoryName) {
    try {
        let inputField = await driver.findElement(By.xpath("//input[@id=':r7:']"));
        await inputField.sendKeys(taskName, Key.RETURN);
        await driver.sleep(500);
        let descriptionElement = await driver.findElement(By.xpath("//textarea[@id=':r8:']"));
        await descriptionElement.sendKeys(descName);
        let categoryFields = await driver.findElement(By.xpath("//body/div[@id='root']/div[4]/div[5]/div[1]/div[1]"));
        await categoryFields.click();
        let categorySelection = await driver.findElement(By.xpath(`//body/div[@id='menu-']/div[3]/ul[1]/li[${categoryName}]`));
        await categorySelection.click();
        await driver.sleep(1000);
        await driver.findElement(By.xpath("//body/div[@id='menu-']/div[3]")).sendKeys(Key.ESCAPE);
        await driver.sleep(1000);
        let submitButton = await driver.findElement(By.xpath("//body/div[@id='root']/div[4]/button[1]"));
        await submitButton.click();
        
    }
    catch(e){
        console.log(e);
      }
       finally {
        // await driver.quit();
      }
  }
  
  async function searchTask(driver, search) {
    try {
        let inputField = await driver.findElement(By.xpath("/html/body/div[1]/main/div[1]/div/input"));
        await inputField.sendKeys(search, Key.RETURN);
        await driver.sleep(500);
    }
    catch(e){
        console.log(e);
      }
       finally {
        // await driver.quit();
      }
  }
  
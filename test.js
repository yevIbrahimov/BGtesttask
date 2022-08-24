const { log } = require("console");
const {By, Builder, until} = require("selenium-webdriver");
require("chromedriver");


async function BGtest(){
    //To wait for browser to build and launch properly
    let driver = await new Builder().forBrowser("chrome").build();
    driver.manage().window().maximize();

    //Go to the https://www.olympia.casino/
    await driver.get("https://www.olympia.casino/");

    //Open sign up modal
    driver.wait(until.elementIsNotVisible(driver.findElement(By.id("loading-root"))), 20000);

    let signUpBtn = await driver.findElement(By.xpath("//a[text()='Sign up']"));
    await driver.wait(until.elementIsEnabled(signUpBtn), 10000);
    
    await signUpBtn.click();

    //Open any temp mail website (like https://tempmail.dev/en) in a separate tab
    await driver.switchTo().newWindow("tab");
    await driver.get("https://tempmail.dev/en");

    //Copy email address from step 3
    let emailElement = await driver.wait(until.elementIsEnabled(
        driver.findElement(
            By.id("current-mail"))), 20000);

    let email = emailElement.getText();

    //Fill in email in modal from step 2
    let tabs = await driver.getAllWindowHandles();
    await driver.close();
    await driver.findElement(By.id("email")).sendKeys(email);

    //Generate random password and fill password field
    await driver.findElement(By.id("password_single")).sendKeys("randomP@ssword123");

    //Choose Aud currency 
    await driver.findElement(By.id("currency")).click();
    await driver.findElement(By.xpath("//div[text()='AUD']")).click();

    //Find Next button by TEXT
    let nextBtn = await driver.findElement(By.xpath("//button[text()='next']"));

    //Click Next
    nextBtn.click();

    //Fill all other fields, continue to click next and stop at the last step
    await driver.findElement(By.id("first_name")).sendKeys("firstname");
    await driver.findElement(By.id("last_name")).sendKeys("lastname");
    await driver.findElement(By.name("date_of_birth_day")).sendKeys("1");
    await driver.findElement(By.name("date_of_birth_month")).sendKeys("1");
    await driver.findElement(By.name("date_of_birth_year")).sendKeys("1");

    await driver.findElement(By.id("city")).sendKeys("Kyiv");
    await driver.findElement(By.id("address")).sendKeys("Bankova");
    await driver.findElement(By.id("postal_code")).sendKeys("03022");
    await driver.findElement(By.xpath("//span[text()='I am 18 years old and I accept the']"));

    await driver.quit();
}

try{
    BGtest();
} 
catch(error){   
    log(error);
}

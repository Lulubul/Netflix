using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using System;
using System.Linq;
using System.Threading;
using Xunit;

namespace PerformanceTesting.Pages
{
    public class StreamingApp
    {
        private readonly IWebDriver driver;
        private readonly string url = @"https://netflixapi20190616090628.azurewebsites.net/signup/login";
        private readonly string email = Guid.NewGuid().ToString() + "@gmail.com";

        public StreamingApp(IWebDriver browser)
        {
            this.driver = browser;
            driver.Manage().Window.Maximize();
        }

        public void Navigate()
        {
            driver.Navigate().GoToUrl(url);
            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(10);
        }

        public void ClickSignUp()
        {
            var signUp = driver.FindElement(By.LinkText("Sign up now."));
            signUp.Click();
        }

        public void WaitUntilPlansAreLoaded()
        {
            WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
            try
            {
                wait.Until(x => x.FindElement(By.ClassName("table-dark")));
            }
            catch (Exception e) { }
            var planButton = driver.FindElements(By.ClassName("btn-primary")).First();
            planButton.Click();
            var nextButton = driver.FindElement(By.ClassName("btn-oversize"));
            nextButton.Click();
        }

        public void FillRegisterForm()
        {
            var emailElement = driver.FindElement(By.Id("formEmail"));
            emailElement.SendKeys(email);
            var passwordElement = driver.FindElement(By.Id("formPassword"));
            passwordElement.SendKeys("Hello");
            var nextButton = driver.FindElement(By.ClassName("btn-primary"));
            nextButton.Click();
        }

        public void FillPaymentForm()
        {
            var firstNameElement = driver.FindElement(By.Id("formFirstName"));
            firstNameElement.SendKeys("Dan");
            var lastNameElement = driver.FindElement(By.Id("formLastName"));
            lastNameElement.SendKeys("Robert");
            var cardNumberElement = driver.FindElement(By.Id("formCardtNumber"));
            cardNumberElement.SendKeys("321312312");
            var securityCodeElement = driver.FindElement(By.Id("formSecurityCode"));
            securityCodeElement.SendKeys("23231");
            var nextButton = driver.FindElement(By.ClassName("btn-primary"));
            nextButton.Click();
        }

        public void AddProfile()
        {
            var addProfile = driver.FindElement(By.ClassName("profile-wrapper"));
            addProfile.Click();
            var profileInput = driver.FindElement(By.CssSelector(".profile-entry input"));
            profileInput.SendKeys("Daniel");
            var nextButton = driver.FindElement(By.CssSelector("#newProfile .btn-primary"));
            nextButton.Click();
        }

        public void FindMovie()
        {
            var profileImage = driver.FindElement(By.CssSelector(".profile-wrapper img"));
            profileImage.Click();
            WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
            try
            {
                wait.Until(x => x.FindElement(By.CssSelector(".items .boxart-image")));
            }
            catch (Exception e) { }
            var searchInput = driver.FindElement(By.CssSelector(".search-bar input"));
            searchInput.SendKeys("Kung Fu Panda");
            var searchButton = driver.FindElement(By.ClassName("btn-outline-success"));
            searchButton.Click();
            var firstMovie = driver.FindElements(By.CssSelector(".watchItems .boxart-image"))[0];
            firstMovie.Click();

            WebDriverWait waitForVideo = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
            try
            {
                waitForVideo.Until(x => x.FindElement(By.CssSelector("#video")));
            }
            catch (Exception e) { }
            var movieButton = driver.FindElements(By.CssSelector(".nav-item"))[2];
            movieButton.Click();
        }

        public void FindRecommendation()
        {
            //var profileImage = driver.FindElement(By.CssSelector(".profile-wrapper img"));
            //profileImage.Click();
            driver.FindElement(By.XPath("//h2[text() = 'Top picks for Daniel']"));

            var elements = driver.FindElements(By.CssSelector(".rowContainer .boxart-container")).Count;
            Assert.Equal(24, elements);
        }
    }
}

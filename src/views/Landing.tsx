import Arrow from '../assets/card-arrow.svg';
import Check from '../assets/checkIcon.svg';
import Collab from '../assets/collab.svg';
import Dashboard from '../assets/dashboard.svg';
import Docchat from '../assets/docchat.svg';
import FAQ from '../assets/faq.svg';
import Flash from '../assets/flashIcon.svg';
import Flashcards from '../assets/flashcards.svg';
import Gpt from '../assets/gpt.svg';
import Homework from '../assets/homework.svg';
import Marketplace from '../assets/marketplace.svg';
import Spark from '../assets/miniSparks.svg';
import Pricing from '../assets/pricing.svg';
import Question from '../assets/question.svg';
import Quiz from '../assets/quiz.svg';
import Share from '../assets/share.svg';
import Sparkles from '../assets/sparkles.svg';
import Sparks from '../assets/sparks.svg';
import Study from '../assets/study.svg';
import Star from '../assets/banner-star.svg';
import Mail from '../assets/mail-icon.svg';
import Twitter from '../assets/twitter-icon.svg';
import Linkedin from '../assets/linkedin-icon.svg';
import Insta from '../assets/insta-icon.svg';
import Heart from '../assets/heart.svg';
import Dot from '../assets/dot.svg';
import Logo from '../components/Logo';
import faqData from '../mocks/faqs.json';
import {
  Button,
  Box,
  Link,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon
} from '@chakra-ui/react';
import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

function Landing() {
  //   const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('AI');

  const handleTabClick = (id: string) => {
    setActiveTab(id);
  };

  return (
    <div className="landing-wrapper">
      <div className="landing-gradient">
        <div className="landing-header">
          <div className="logo-wrapper">
            <Logo customWidth="width: 124px" customHeight="height: 51px" />
          </div>
          <div className="header-cta">
            <Link className="header-link">Sign in</Link>
            <Button className="header-btn">Get Started</Button>
          </div>
        </div>
        <div className="landing-title-wrapper">
          <Text className="landing-title-sub" style={{ color: '#207df7' }}>
            LEARN BETTER
          </Text>
          <Text className="landing-title">
            Your all in one AI{' '}
            <img className="landing-title-img" src={Sparkles} /> powered
            learning assistant
          </Text>
          <Text className="landing-desc">
            Shepherd provides an integrated experience to improve your learning
            outcomes. It understands you, your learning journey and connects you
            to everything you need to learn better.
          </Text>
        </div>
        <img className="landing-img" src={Dashboard} />
      </div>

      <div className="post-gradient">
        <div className="landing-section-info">
          <img className="landing-icon" src={Sparks} />
          <Text className="landing-title-sub" style={{ color: '#207df7' }}>
            PERSONAL AI ASSISTANT
          </Text>
          <Text className="landing-info">
            Unlock a vast array of AI-enabled learning tools and resources with
            Shepherd
          </Text>
          <Text className="landing-desc">
            Shepherd is optimized for learning. It is trained on some of the
            most up-to-date subject texts to minimize errors.
          </Text>
        </div>
        <div className="landing-section">
          <img className="landing-hw-img" src={Homework} />
          <div className="landing-section-img">
            <img className="landing-flash-img" src={Flashcards} />
            <img className="landing-study-img" src={Study} />
          </div>
          <div className="landing-section-img">
            <img className="landing-doc-img" src={Docchat} />
            <img className="landing-quiz-img" src={Quiz} />
          </div>
        </div>
        <div className="landing-section-info">
          <img className="landing-icon" src={Marketplace} />
          <Text className="landing-title-sub" style={{ color: '#BB38FA' }}>
            A MODERN TUTOR MARKET PLACE
          </Text>
          <Text className="landing-info">Still Stuck? Don't worry!</Text>
          <Text className="landing-desc" style={{ width: '714px' }}>
            Shepherd understands one on one tutors are the biggest drivers for
            improving learning outcomes. Shepherd connects you with the right
            affordable tutor for you!
          </Text>
        </div>
        <div className="landing-section-desc">
          <div className="landing-desc-info">
            <Text className="landing-info-mini">
              Shepherd detects your struggle
            </Text>
            <Text className="landing-desc-mini">
              Shepherd observes your learning journey and identifies the areas
              where you need help the most.
            </Text>
            <Button className="landing-btn">Find a Tutor</Button>
            <Text className="landing-info-mini info-accordion" style={{ color: '#969CA6' }}>
              Shepherd recommends a tutor
            </Text>
            <Text className="landing-info-mini info-accordion" style={{ color: '#969CA6' }}>
              Interactive learning
            </Text>
          </div>
          <img className="landing-gpt-img" src={Gpt} />
        </div>
        <div className="landing-section-metric">
          <div className="landing-metric-mini">
            <Text className="landing-info-mini">Join Shepherd</Text>
            <Text className="landing-desc-mini">
              With Shepherd, no one is left out, by leveraging our array of
              AI-powered tools everyone can tap into the transformative power of
              technology, unlocking their full potential.
            </Text>
          </div>
          <div className="landing-cta-wrapper">
            <div className="landing-cta-card">
              <div className="landing-metric-wrapper">
                <Text className="landing-metric">1M+</Text>
                <Text className="landing-metric-tag">LEARNERS</Text>
              </div>
              <Link
                className="landing-title-sub"
                style={{
                  display: 'flex',
                  fontSize: '15px',
                  fontWeight: '500',
                  color: '#207df7'
                }}
              >
                Join our waitlist{' '}
                <img className="landing-card-arrow" src={Arrow} />
              </Link>
            </div>
            <div className="landing-cta-card">
              <div className="landing-metric-wrapper">
                <Text className="landing-metric">100+</Text>
                <Text className="landing-metric-tag">TUTORS</Text>
              </div>
              <Link
                className="landing-title-sub"
                style={{
                  display: 'flex',
                  fontSize: '15px',
                  fontWeight: '500',
                  color: '#207df7'
                }}
              >
                Become a tutor{' '}
                <img className="landing-card-arrow" src={Arrow} />
              </Link>
            </div>
            <div className="landing-cta-card">
              <div className="landing-metric-wrapper">
                <Text className="landing-metric">50+</Text>
                <Text className="landing-metric-tag">SCHOOLS</Text>
              </div>
              <Link
                className="landing-title-sub"
                style={{
                  display: 'flex',
                  fontSize: '15px',
                  fontWeight: '500',
                  color: '#207df7'
                }}
              >
                Bring Shepherd to your school{' '}
                <img className="landing-card-arrow" src={Arrow} />
              </Link>
            </div>
          </div>
        </div>
        <div className="landing-section-info">
          <Text className="landing-title-sub-bubble">COMING SOON</Text>
          <Text
            className="landing-title-sub"
            style={{ color: '#FB8441', fontSize: '15px' }}
          >
            LEARN TOGETHER
          </Text>
          <Text className="landing-info">Collaborate with other learners</Text>
          {/* <div className="landing-coming-soon">
            <div className="landing-section-item">
              <img className="landing-coming-soon-icon" src={Collab} />
              <Text className="landing-desc-mini">
                Be a part of a learning community in your school or across other
                schools.
              </Text>
            </div>
            <div className="landing-section-item">
              <img className="landing-coming-soon-icon" src={Share} />
              <Text className="landing-desc-mini">
                Share your notes, flashcards with other learners.
              </Text>
            </div>
            <div className="landing-section-item">
              <img className="landing-coming-soon-icon" src={Spark} />
              <Text className="landing-desc-mini">
                Start a group study session moderated by Shepherd.
              </Text>
            </div>
            <div className="landing-section-item">
              <img className="landing-coming-soon-icon" src={Question} />
              <Text className="landing-desc-mini">
                Ask questions and get them answered by people studying the
                subject.
              </Text>
            </div>
          </div> */}
          <Button className="landing-title-btn">Get to Know Shepherd</Button>
        </div>
        <div
          className="landing-section-info"
          style={{
            backgroundColor: '#FAFAFA',
            padding: '80px',
            marginTop: '50px',
            gap: '12px'
          }}
        >
          <img className="landing-icon" src={Pricing} />
          <Text className="landing-title-sub" style={{ color: '#FB8441' }}>
            PRICING
          </Text>
          <div className="landing-price-wrapper">
            <div className="landing-price-card">
              <div className="landing-metric-wrapper">
                <Text className="landing-price-level">Basic</Text>
              </div>
              <div className="landing-metric-wrapper">
                <Text className="landing-price-point">Free</Text>
              </div>
              <div className="landing-section-item">
                <div className="landing-price-value">
                  <img className="landing-check-icon" src={Check} />
                  <Text className="landing-desc-mini">
                    Up to 10 flashcard decks
                  </Text>
                </div>
                <div className="landing-price-value">
                  <img className="landing-check-icon" src={Check} />
                  <Text className="landing-desc-mini">
                    Up to 10 flashcard decks
                  </Text>
                </div>
                <div className="landing-price-value">
                  <img className="landing-check-icon" src={Check} />
                  <Text className="landing-desc-mini">
                    Up to 10 flashcard decks
                  </Text>
                </div>
                <div className="landing-price-value">
                  <img className="landing-check-icon" src={Check} />
                  <Text className="landing-desc-mini">
                    Up to 10 flashcard decks
                  </Text>
                </div>
                <Button className="landing-price-btn">Try for Free</Button>
              </div>
            </div>
            <div
              className="landing-price-card"
              style={{ position: 'relative' }}
            >
              <Text className="landing-price-sub-bubble">Popular</Text>
              <div className="landing-metric-wrapper">
                <Text className="landing-price-level">Intermediate</Text>
              </div>
              <div className="landing-metric-wrapper">
                <Text className="landing-price-point">$10</Text>
                <Text
                  className="landing-metric-tag"
                  style={{ fontWeight: '400' }}
                >
                  /Month
                </Text>
              </div>
              <div className="landing-section-item">
                <div className="landing-price-value">
                  <img className="landing-check-icon" src={Check} />
                  <Text className="landing-desc-mini">
                    Up to 10 flashcard decks
                  </Text>
                </div>
                <div className="landing-price-value">
                  <img className="landing-check-icon" src={Check} />
                  <Text className="landing-desc-mini">
                    Up to 10 flashcard decks
                  </Text>
                </div>
                <div className="landing-price-value">
                  <img className="landing-check-icon" src={Check} />
                  <Text className="landing-desc-mini">
                    Up to 10 flashcard decks
                  </Text>
                </div>
                <div className="landing-price-value">
                  <img className="landing-check-icon" src={Check} />
                  <Text className="landing-desc-mini">
                    Up to 10 flashcard decks
                  </Text>
                </div>
                <Button className="landing-price-btn">Subscribe Now</Button>
              </div>
            </div>
            <div className="landing-price-card">
              <div className="landing-metric-wrapper">
                <Text className="landing-price-level">Premium</Text>
              </div>
              <div className="landing-metric-wrapper">
                <Text className="landing-price-point">$10</Text>
                <Text
                  className="landing-metric-tag"
                  style={{ fontWeight: '400' }}
                >
                  /Month
                </Text>
              </div>
              <div className="landing-section-item">
                <div className="landing-price-value">
                  <img className="landing-check-icon" src={Check} />
                  <Text className="landing-desc-mini">
                    Up to 10 flashcard decks
                  </Text>
                </div>
                <div className="landing-price-value">
                  <img className="landing-check-icon" src={Check} />
                  <Text className="landing-desc-mini">
                    Up to 10 flashcard decks
                  </Text>
                </div>
                <div className="landing-price-value">
                  <img className="landing-check-icon" src={Check} />
                  <Text className="landing-desc-mini">
                    Up to 10 flashcard decks
                  </Text>
                </div>
                <div className="landing-price-value">
                  <img className="landing-check-icon" src={Check} />
                  <Text className="landing-desc-mini">
                    Up to 10 flashcard decks
                  </Text>
                </div>
                <Button className="landing-price-btn">Subscribe Now</Button>
              </div>
            </div>
          </div>
        </div>
        <div className="landing-section-faq">
          <div className="landing-faq-title-wrapper">
            <Text className="landing-title-sub" style={{ color: '#207df7' }}>
              FAQs
            </Text>
            <Text className="landing-faq-title">
              We thought of <img className="landing-faq-icon" src={FAQ} /> you
              might have
            </Text>
          </div>
          <div className="landing-faq-filters">
            <div
              className={`landing-faq-filter ${
                activeTab === 'AI' ? 'active' : ''
              }`}
              id="AI"
              onClick={() => handleTabClick('AI')}
            >
              {' '}
              AI
            </div>
            <div
              className={`landing-faq-filter ${
                activeTab === 'Tutors' ? 'active' : ''
              }`}
              id="Tutors"
              onClick={() => handleTabClick('Tutors')}
            >
              Tutors
            </div>
            <div
              className={`landing-faq-filter ${
                activeTab === 'Data' ? 'active' : ''
              }`}
              id="Data"
              onClick={() => handleTabClick('Data')}
            >
              Data
            </div>
            <div
              className={`landing-faq-filter ${
                activeTab === 'Pricing' ? 'active' : ''
              }`}
              id="Pricing"
              onClick={() => handleTabClick('Pricing')}
            >
              Pricing
            </div>
            <div
              className={`landing-faq-filter ${
                activeTab === 'General' ? 'active' : ''
              }`}
              id="General"
              onClick={() => handleTabClick('General')}
            >
              General
            </div>
          </div>
          <div className="faq-data-wrapper">
            <Accordion className="faq-accordion" allowToggle>
              {faqData[activeTab].map((faq, index) => (
                <AccordionItem className="faq-item-data" key={index}>
                  <AccordionButton className="faq-accordion-btn">
                    <Box as="span" flex="1" textAlign="left">
                      {faq.title}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel className="faq-accordion-panel">
                    {faq.content}
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
        <div className="landing-cta-banner">
          <div className="landing-cta-banner-info">
            <Text className="landing-title-sub" style={{ color: '#207df7' }}>
              YOU ARE CONVINCED
            </Text>
            <Text className="landing-banner-title">
              Join us today, it’s time to supercharge{' '}
              <img className="banner-icon" src={Flash} /> your learning
            </Text>
            <Text className="banner-desc">
              Shepherd provides an integrated experience to improve your
              learning outcomes. It understands you, your learning journey and
              connects you to everything you need to learn better.
            </Text>
            <Button className="landing-banner-btn">Get Started for Free</Button>
          </div>
          {/* <img className="banner-img" src={Star} style={{marginTop: '200px'}} /> */}
        </div>
        <div className="landing-footer">
          <div className="landing-links">
            <div className="landing-footer-logo">
              <Logo customWidth="width: 124px" customHeight="height: 51px" style={{margin:'0px'}} />
              <Text className="landing-address">
                123 Hackerway,Menlo Park, CA 94025,USA
              </Text>
            </div>
            <div className="landing-links-wrapper">
              <div className="landing-link-wrapper">
                <Text className="landing-links-title">
                  Product
                </Text>
                <Link className="landing-link">Shepherd</Link>
                <Link className="landing-link">Become a Tutor</Link>
                <Link className="landing-link">Pricing</Link>
                <Link className="landing-link">FAQs</Link>
              </div>
              <div className="landing-link-wrapper">
                <Text className="landing-links-title">
                  Resources
                </Text>
                <Link className="landing-link">Shepherd</Link>
                <Link className="landing-link">Become a Tutor</Link>
                <Link className="landing-link">Pricing</Link>
                <Link className="landing-link">FAQs</Link>
              </div>
            </div>
            <div className="landing-footer-socials">
              <div className="landing-link-wrapper">
                <Text className="landing-links-title" style={{color:'#7A7E85'}}>
                  Reach out to us
                </Text>
                <div className="landing-footer-icons">
                  <img className="footer-icon" src={Mail} />
                  <img className="footer-icon" src={Twitter} />
                  <img className="footer-icon" src={Linkedin} />
                  <img className="footer-icon" src={Insta} />
                </div>
              </div>
            </div>
          </div>
          <div className="landing-signature">
            <Text className="landing-signature-info">
              &#169; 2023 Shepherd Tutors
            </Text>
            <Text className="landing-signature-info">
              Built with love <img className="landing-heart-icon" src={Heart} />
            </Text>
            <div className="landing-terms">
              <Text className="landing-signature-info" style={{cursor: 'pointer'}}>
                Privacy policy
              </Text>
              <img className="landing-dot-icon" src={Dot} />
              <Text className="landing-signature-info" style={{cursor: 'pointer'}}>
                Terms of use
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;

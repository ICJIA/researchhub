<template>
  <div>
    <BaseViewTitle :page="title" />

    <AboutSection :title="section1.title" :subNum="3">
      <template v-slot:subtitle1>{{ section1.sub1.title }}</template>
      <p v-html="section1.p1" class="italic small greycolor pb-4"></p>
      <template v-slot:subbody1>
        <p v-html="section1.sub1.p1"></p>
        <p v-html="section1.sub1.p2"></p>
      </template>

      <template v-slot:subtitle2>{{ section1.sub2.title }}</template>
      <template v-slot:subbody2>
        <p v-html="section1.sub2.p1"></p>
        <p v-html="section1.sub2.p2"></p>
        <p v-html="section1.sub2.p3"></p>
      </template>

      <template v-slot:subtitle3>{{ section1.sub3.title }}</template>
      <template v-slot:subbody3>
        <p v-html="section1.sub3.p1"></p>
        <p v-html="section1.sub3.p2"></p>
        <p v-html="section1.sub3.p3"></p>
      </template>
    </AboutSection>

    <AboutSection :title="section2.title">
      <p v-html="section2.p1"></p>
      <p v-html="section2.p2"></p>
      <p v-html="section2.p3"></p>
      <p v-html="section2.p4"></p>
    </AboutSection>

    <AboutSection :title="section3.title">
      <p v-html="section3.p1"></p>
      <p v-html="section3.p2"></p>
      <p v-html="section3.p3"></p>
    </AboutSection>
  </div>
</template>

<script>
const AboutSection = () => import('@/components/AboutSection')
const BaseViewTitle = () => import('@/components/BaseViewTitle')

export default {
  name: 'About',
  metaInfo: {
    titleTemplate: 'About | %s'
  },
  components: {
    AboutSection,
    BaseViewTitle
  },
  data() {
    return {
      title: 'About',
      hrefICJIA: 'http://www.icjia.state.il.us',
      hrefGithub: 'https://www.github.com/ICJIA',
      hrefDocs: '/docs/',
      linkIconHtml:
        '<i aria-hidden="true" class="v-icon notranslate mdi mdi-open-in-new theme--light"></i>'
    }
  },
  computed: {
    section1() {
      return {
        title: 'ICJIA Research Hub',
        p1:
          "This project was supported by State Justice Statistics (SJS) \
          Program Grant #2018-BJ-CX-XXXX, awarded to the Illinois Criminal \
          Justice Information Authority by the U.S. Department of Justice \
          Office of Justice Programs' Bureau of Justice Statistics.",
        sub1: {
          title: 'Open data, open research, open government',
          p1:
            'The Research & Analysis Unit of ' +
            this.hyperlink(
              this.hrefICJIA,
              'the Illinois Criminal Justice Information Authority (ICJIA)'
            ) +
            " serves as Illinois' Statistical Analysis Center (SAC) and \
            provides analysis of criminal justice data or informing statewide \
            policy and practice.",
          p2:
            "As of its launching, <em>ICJIA Research Hub</em> marks the \
            latest iteration of the Illinois SAC's ongoing effort to bring \
            criminal justice data and research to the public. \
            <em>ICJIA Research Hub</em> more fully embraces the spirit of \
            the Federal Government's " +
            this.hyperlink(
              'https://project-open-data.cio.gov/policy-memo/',
              'Open Data Policy'
            ) +
            ' and the ideals of open data, open research and open government.'
        },
        sub2: {
          title: 'Open source technology',
          p1:
            "As an embodiment of the Illinois SAC's appreciation \
            of transparency, <em>ICJIA Research Hub</em> is developed \
            publicly on " +
            this.hyperlink(this.hrefGithub, 'GitHub') +
            ' with XXX license.',
          p2:
            'It is also powered by popular open source projects,\
            including: <ul><li>' +
            this.hyperlink('https://vuejs.org/', 'Vue.js') +
            ' and ' +
            this.hyperlink('https://vuetifyjs.com/', 'Vuetify.js') +
            ' for user interface;</li><li>' +
            this.hyperlink('https://vuepress.vuejs.org/', 'VuePress') +
            ' for documentation;</li><li>' +
            this.hyperlink('https://strapi.io/', 'Strapi') +
            ' for headless contenet management system;</li><li>' +
            this.hyperlink('https://www.docker.com/', 'Docker') +
            ' for for containerization;</li><li>and many more.</li>',
          p3:
            'Visit ' +
            this.hyperlink(
              '/docs/',
              'the <em>ICJIA Research Hub</em> Documentation page'
            ) +
            ' to learn more about <em>ICJIA Research Hub</em> and its \
            technical details.'
        },
        sub3: {
          title: 'Need your help',
          p1:
            "In addition to being transparent, <em>ICJIA Research Hub</em> \
            invites participation from the public to further improve this \
            project and keep it closely aligned with the public's interests \
            and concerns.",
          p2:
            'If you are a developer, please consider contributing to the \
            project on ' +
            this.hyperlink(this.hrefGithub, 'GitHub') +
            '. You can also submit applications using our criminal justice \
            data collections. Your submission will be featured on <em>ICJIA \
            Research Hub</em>\'s "App" page with a proper attribution after \
            going through an internal review process.',
          p3:
            'Visit ' +
            this.hyperlink(
              '/docs/',
              'the <em>ICJIA Research Hub</em> Documentation page'
            ) +
            ' to learn more about contribution and making submissions to \
            <em>ICJIA Research Hub</em>.'
        }
      }
    },
    section2() {
      return {
        title: 'Illinois Criminal Justice Information Authority',
        p1:
          'Created in 1983, the Illinois Criminal Justice Information \
          Authority (ICJIA) is a state agency dedicated to improving the \
          administration of criminal justice.',
        p2:
          "ICJIA brings together key leaders from the justice system and the \
          public to identify critical issues facing the criminal justice \
          system in Illinois, and to propose and evaluate policies, programs, \
          and legislation that address those issues. The agency also works to \
          ensure the criminal justice system in Illinois is efficient and \
          effective. ICJIA's specific powers and duties are detailed in \
          the Illinois Criminal Justice Information Act [ " +
          this.hyperlink(
            'http://www.ilga.gov/legislation/ilcs/ilcs3.asp?ActID=397&ChapterID=5',
            '20 ILCS 3930 et. seq.'
          ) +
          ' ].',
        p3:
          'The statutory responsibilities of ICJIA fall under the categories \
          of grants administration, research and analysis, policy and \
          planning, and information systems and technology.',
        p4:
          'For more information about ICJIA, please visit ' +
          this.hyperlink(this.hrefICJIA, 'the official website') +
          '.'
      }
    },
    section3() {
      return {
        title: 'Illinois Open Data Portal',
        p1:
          'The State of Illinois offers a state-wide open data portal, which \
          lets you find data across state, facts about your state, create \
          maps and graphs, and freely download the data for your own \
          analysis. Many of these datasets are updated daily, and some even \
          more often.',
        p2:
          "On March 10, 2014, the Illinois General Assembly unanimously \
          passed PA 98-0627, a bill introduced by the Governor's Office and \
          intended to increase transparency, accountability and savings in \
          government by establishing a new State Open Operating Standard.",
        p3:
          'For more information, please visit ' +
          this.hyperlink(
            'https://data.illinois.gov/',
            'Illinois Open Data Portal'
          ) +
          '.'
      }
    }
  },
  methods: {
    hyperlink(href, text) {
      const icon = this.linkIconHtml
      return `<a href="${href}" target="_blank" rel="noreferrer">${text}${icon}</a>`
    }
  }
}
</script>

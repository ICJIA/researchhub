<template>
  <!-- eslint-disable vue/no-v-html -->
  <div>
    <BaseViewTitle page="About" />

    <BaseAboutSection :title="$options.static.section1.title" :sub-num="3">
      <template #subtitle1>{{ $options.static.section1.sub1.title }}</template>

      <template #subbody1>
        <p
          v-for="(p, i) in $options.static.section1.sub1.paragraphs"
          :key="i"
          v-html="p"
        ></p>
      </template>

      <template #subtitle2>{{ $options.static.section1.sub2.title }}</template>
      <template #subbody2>
        <p
          v-for="(p, i) in $options.static.section1.sub2.paragraphs"
          :key="i"
          v-html="p"
        ></p>
      </template>
    </BaseAboutSection>

    <BaseAboutSection :title="$options.static.section2.title">
      <p
        v-for="(p, i) in $options.static.section2.paragraphs"
        :key="i"
        v-html="p"
      ></p>
    </BaseAboutSection>

    <BaseAboutSection :title="$options.static.section3.title">
      <p
        v-for="(p, i) in $options.static.section3.paragraphs"
        :key="i"
        v-html="p"
      ></p>
    </BaseAboutSection>
  </div>
</template>

<script>
import { mdiOpenInNew } from '@mdi/js'
import { publicPath } from '@/config'
const BaseAboutSection = () => import('@/components/BaseAboutSection')
const BaseViewTitle = () => import('@/components/BaseViewTitle')

const hyperlink = (href, text) => {
  const icon = `<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  height="24"
  width="24"
  role="img"
  aria-hidden="true"
  class="v-icon notranslate v-icon--svg theme--light"
  ><path d="${mdiOpenInNew}"></path></svg>`

  return `<a href="${href}" target="_blank" rel="noreferrer">${text}${icon}</a>`
}

export default {
  metaInfo: {
    titleTemplate: 'About | %s'
  },
  components: {
    BaseAboutSection,
    BaseViewTitle
  },
  static: {
    section1: {
      title: 'ICJIA Research Hub',
      sub1: {
        title: 'Open data, open research, open government',
        paragraphs: {
          p1:
            "<em>ICJIA Research Hub</em> marks the latest iteration of \
              ICJIA's ongoing effort to bring criminal justice data and \
              research to the public. <em>ICJIA Research Hub</em> encompasses \
              the spirit of the Federal Government's " +
            hyperlink(
              'https://project-open-data.cio.gov/policy-memo/',
              'Open Data Policy'
            ) +
            ' and the ideals of open data, open research, and open government.'
        }
      },
      sub2: {
        title: 'Open source technology',
        paragraphs: {
          p1:
            "As an embodiment of ICJIA's appreciation of \
              transparency, <em>ICJIA Research Hub</em> \
              applications are developed publicly on " +
            hyperlink('https://www.github.com/ICJIA', 'GitHub') +
            ' with MIT license.',
          p2:
            'It is also powered by many popular open source projects,\
              including: <ul><li>' +
            hyperlink('https://vuejs.org/', 'Vue.js') +
            ' and ' +
            hyperlink('https://vuetifyjs.com/', 'Vuetify.js') +
            ' for user interface,</li><li>' +
            hyperlink('https://vuepress.vuejs.org/', 'VuePress') +
            ' for documentation,</li><li>' +
            hyperlink('https://strapi.io/', 'Strapi') +
            ' for headless contenet management system, and</li><li>' +
            hyperlink('https://www.docker.com/', 'Docker') +
            ' for containerization.',
          p3:
            'Visit ' +
            hyperlink(
              publicPath + 'docs/',
              '<em>ICJIA Research Hub</em> Documentation site'
            ) +
            ' to learn more.',
          p4:
            'In particular, if you are interested in contributing to the \
              <em>ICJIA Research Hub</em> codebase, please refer to ' +
            hyperlink(
              publicPath + 'docs/dev-guide/contributing/codebase',
              'the relevant page in the documentation'
            ) +
            '.'
        }
      }
    },
    section2: {
      title: 'ICJIA Research & Analysis Unit',
      paragraphs: {
        p1:
          'The Research & Analysis Unit of ' +
          hyperlink(
            'http://www.icjia.state.il.us',
            'the Illinois Criminal Justice Information Authority (ICJIA)'
          ) +
          " serves as Illinois' Statistical Analysis Center (SAC) and \
            provides analysis of criminal justice data for informing statewide \
            policy and practice.",
        p2:
          'The Illinois SAC is affiliated with and supported by ' +
          hyperlink(
            'http://www.jrsa.org/',
            'the Justice Research and Statistics Association'
          ) +
          ', a national nonprofit organization that promotes collaboration \
            and exchange of information among state SACs, and acts as a \
            liaison between state agencies and the U.S. Department of Justice.',
        p3:
          'For more information, please visit ' +
          hyperlink(
            'http://www.icjia.state.il.us/research',
            'the Illinois SAC'
          ) +
          '.'
      }
    },
    section3: {
      title: 'Illinois Criminal Justice Information Authority',
      paragraphs: {
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
          hyperlink(
            'http://www.ilga.gov/legislation/ilcs/ilcs3.asp?ActID=397&ChapterID=5',
            '20 ILCS 3930 et. seq.'
          ) +
          ' ].',
        p3:
          'The statutory responsibilities of ICJIA fall under the categories \
            of grants administration, research and analysis, policy and \
            planning, and information systems and technology.',
        p4:
          'For more information, please visit ' +
          hyperlink('http://www.icjia.state.il.us', "ICJIA's public website") +
          '.'
      }
    }
  }
}
</script>

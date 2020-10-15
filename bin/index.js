#!/usr/bin/env node
/*
 * @Author: wangyuan
 * @Date: 2020-09-28 14:24:36
 * @LastEditTime: 2020-10-15 17:24:56
 * @LastEditors: wangyuan
 * @Description:
 */
const program = require('commander')
const ora = require('ora')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const inquirer = require('inquirer')
const spinner = ora('开始生产页面')
spinner.color = 'yellow'
let projectName = ''
const compType = {
  GLOBAL_COMP: Symbol('全局组件'),
  PACK_COMP: Symbol('分包公共组件'),
  PAGE_COMP: Symbol('页面组件'),
}
const dirPageArray = fs.readdirSync(`${path.resolve(path.dirname(__filename), `../temp`)}`)
const dirCompArray = fs.readdirSync(`${path.resolve(path.dirname(__filename), `../comp`)}`)
program
  .name('wx-cli')
  // .usage('cli')
  .version('1.0.3', '-v, --vers', '输出版本号')
  .option('-pack, --pack <package>', '输入分包名称')
  .option('-p, --page <page>', '输入页面名称')
  .option('-c, --component <component>', '输入组件名称')
  .parse(process.argv)
const { pack, page, component } = program
main()

function main() {
  try {
    try {
      const projectConfig = JSON.parse(fs.readFileSync(`${path.resolve()}/project.config.json`, 'utf8'))
      projectName = projectConfig.projectname
    } catch (error) {
      spinner.fail(chalk.red('没有在项目根路径执行命令，请检查执行命令的根目录'))
    }
  } catch (error) {
    spinner.warn(chalk.yellow('该项目与所选项目不符，请查看选择对应的项目'))
    return
  }

  // 创建包&&页面
  if (pack) {
    try {
      if (fs.statSync(pack) && page && component) {
        createPage(pack, page)
        createComponent(component, compType.PAGE_COMP)
      } else if (fs.statSync(pack) && page) {
        spinner.start()
        createPage(pack, page)
      } else if (fs.statSync(pack) && component) {
        spinner.info(chalk.blue('分包存在，生成分包公共组件'))
        createComponent(component, compType.PACK_COMP)
      } else if (fs.statSync(pack)) {
        spinner.warn(chalk.yellow('已经存在该目录不在重新创建'))
      }
    } catch (error) {
      fs.mkdirSync(`${path.resolve()}/${pack}`)
      if (page && component) {
        createPage(pack, page)
        createComponent(component, compType.PAGE_COMP)
      } else if (page) {
        spinner.start()
        fs.mkdirSync(`${path.resolve()}/${pack}/pages`)
        createPage(pack, page)
      } else if (component) {
        spinner.info(chalk.blue('页面不存在，创建分包公用组件'))
        createComponent(component, compType.PACK_COMP)
      }
    }
  } else if (page && component) {
    spinner.warn(chalk.yellow('未指定正确分包名或组件名，请检查命令重新输入'))
  } else if (component) {
    createComponent(component, compType.GLOBAL_COMP)
  } else {
    spinner.warn(chalk.yellow('未指定正确分包名或组件名，请检查命令重新输入'))
  }
}
// 创建页面
function createPage(pack, page) {
  spinner.info(chalk.blue(`page is ===========> ${page}`))
  let mainName = getMain()
  if (pack === mainName) {
    try {
      fs.mkdirSync(`${pack}/${page}`)
    } catch (error) {
      spinner.warn(chalk.yellow(`已经存在页面 <${chalk.green(page)}> 文件夹，不在重新创建`))
      return
    }
    dirPageArray.forEach(item => {
      fs.copyFileSync(`${path.resolve(path.dirname(__filename), `../temp`)}/${item}`, `${pack}/${page}/${item}`)
    })
  } else {
    try {
      // 路径可能需要改
      try {
        fs.mkdirSync(`${pack}/pages`)
        fs.mkdirSync(`${pack}/pages/${page}`)
      } catch (error) {
        fs.mkdirSync(`${pack}/pages/${page}`)
      }
    } catch (error) {
      spinner.warn(chalk.yellow(`已经存在页面  <${chalk.green(page)}>  文件夹，不在重新创建`))
      return
    }
    dirPageArray.forEach(item => {
      fs.copyFileSync(`${path.resolve(path.dirname(__filename), `../temp`)}/${item}`, `${pack}/pages/${page}/${item}`)
    })
  }

  const file = fs.readFileSync(`${path.resolve()}/app.json`, 'utf8')
  let setFile = JSON.parse(file)
  const fileArray = setFile.subPackages.map(item => {
    return item.root
  })
  if (fileArray.includes(pack)) {
    setFile.subPackages.map(item => {
      if (item.root === pack) {
        item.pages = [...item.pages, `pages/${page}/index`]
        item.pages = [...new Set(item.pages)]
      }
      return item
    })
  } else {
    let mainName = getMain()
    if (pack === mainName) {
      setFile.pages = [...JSON.parse(file).pages, `pages/${page}/index`]
      setFile.pages = [...new Set(setFile.pages)]
    } else {
      setFile.subPackages = [
        ...JSON.parse(file).subPackages,
        {
          root: pack,
          pages: [`pages/${page}/index`],
        },
      ]
    }
  }

  fs.writeFileSync(`${path.resolve()}/app.json`, JSON.stringify(setFile, null, '\t'))
  spinner.succeed(chalk.green('操作成功'))
}

function createComponent(component, type) {
  spinner.info(chalk.blue(`component is ===========> ${component}`))
  switch (type) {
    case compType.GLOBAL_COMP:
      spinner.info(chalk.blue('创建全局公用组件'))
      try {
        try {
          fs.mkdirSync(`components`)
        } catch (error) {
          spinner.warn(chalk.yellow(`全局组件父级文件夹  <${chalk.green('components')}>  已经存在，仅创建组件文件夹`))
        }
        fs.mkdirSync(`components/${component}`)
      } catch (error) {
        if (fs.statSync(`components/${component}`)) {
          spinner.warn(chalk.yellow('全局组件已经存在，不在重新创建'))
        }
      }
      dirCompArray.forEach(item => {
        fs.copyFileSync(`${path.resolve(path.dirname(__filename), `../comp`)}/${item}`, `components/${component}/${item}`)
      })
      spinner.succeed(chalk.bgGreen(`创建全局公用组件 ${chalk.red.bold(component)} 完成`))
      break
    case compType.PACK_COMP:
      spinner.info(chalk.blue('创建分包公用组件'))
      try {
        fs.mkdirSync(`${path.resolve()}/${pack}/components`)
      } catch (error) {
        spinner.warn(chalk.yellow(`分包公用组件父文件夹 <components> 已存在,只创建组件文件夹`))
      }
      fs.mkdirSync(`${path.resolve()}/${pack}/components/${component}`)
      dirCompArray.forEach(item => {
        fs.copyFileSync(`${path.resolve(path.dirname(__filename), `../comp`)}/${item}`, `${pack}/components/${component}/${item}`)
      })
      spinner.succeed(chalk.bgGreen(`创建分包公用组件 ${chalk.red.bold(component)} 完成`))
      break
    case compType.PAGE_COMP:
      try {
        try {
          fs.mkdirSync(`${path.resolve()}/${pack}/pages/${page}/components`)
          try {
            fs.mkdirSync(`${path.resolve()}/${pack}/pages/${page}/components/${component}`)
          } catch (error) {}
        } catch (error) {
          spinner.warn(chalk.yellow(`组件父文件夹  <${chalk.green('components')}>  文件夹已经存在，只创建组件`))
          try {
            fs.mkdirSync(`${path.resolve()}/${pack}/pages/${page}/components/${component}`)
          } catch (error) {
            spinner.warn(chalk.yellow(`组件已经存在不在重新创建`))
            return
          }
        }
        dirCompArray.forEach(item => {
          fs.copyFileSync(`${path.resolve(path.dirname(__filename), `../comp`)}/${item}`, `${pack}/pages/${page}/components/${component}/${item}`)
        })
      } catch (error) {
        if (!fs.statSync(`${path.resolve()}/${pack}/pages/${page}/components`)) {
          fs.mkdirSync(`${path.resolve()}/${pack}/pages/${page}/components`)
        }
      }
      spinner.succeed(chalk.bgGreen(`创建页面组件 ${chalk.red.bold(component)} 完成`))
      break
    default:
      break
  }
}

function getMain() {
  const file = fs.readFileSync(`${path.resolve()}/app.json`, 'utf8')
  let setFile = JSON.parse(file)
  let main = setFile.pages[0].split('/')[0]
  return main
}

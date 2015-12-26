# This package will contain the spiders of your Scrapy project
#
# Please refer to the documentation for information on how to create and manage
# your spiders.
from scrapy.spiders import Spider
#from scrapy.selector import HtmlXPathSelector
from scrapy.selector import Selector
from tutorial.items import DmozItem

class DmozSpider(Spider):
    """Dmoz Spider"""
    name = "dmoz"
    allowed_domains = ["dmoz.org"]
    start_urls = [
        "http://www.dmoz.org/Computers/Programming/Languages/Python/Books/",
        "http://www.dmoz.org/Computers/Programming/Languages/Python/Resources/"
    ]

    def parse(self, response):
        #hxs = HtmlXPathSelector(response)
        sites = response.selector.xpath('//ul/li')
        items = []
        for site in sites:
            item = DmozItem()
            item['title'] = site.xpath('a/text()').extract()
            item['link'] = site.xpath('a/@href').extract()
            item['desc'] = ''.join(site.xpath('text()').extract()).strip()
            items.append(item)
        return items

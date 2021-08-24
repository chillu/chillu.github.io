---
date: "2013-11-15T13:54:00+00:00"
draft: false
tags: ["silverstripe", "testing"]
title: "Behat Step Transformations for Relative Time"
---
<p>I've been playing around with "Specification By Example" style tests for a while now, but really kicked things off while <a href="http://www.silverstripe.org/gsoc-2012-results-are-in-6x-awesomeness/">mentoring</a> a <a href="github.com/silverstripe-labs/silverstripe-behat-extension">Behat+SilverStripe integration</a>&nbsp;at Google Summer of Code 2013. The <a href="http://silverstripe.org">SilverStripe CMS</a>&nbsp;UI is a complex beast, so it requires frequent additions to our Behat context. Today I've come across an interesting problem with relative dates: We want to test that a CMS report only shows recently edited pages, without hardcoding any dates. We came up with the following feature:</p>
<pre>Scenario: I can search for a page by its newest last edited date
	Given a "page" "Recent Page"
	And a "page" "Old Page" was last edited "7 days ago"
	When I fill in "To" with "the date of 5 days ago"
	And I press the "Apply Filter" button
	Then I should not see "Recent Page" in the tree
	But I should see "Old Page" in the tree
</pre>
<p>There's some specifics to the SilverStripe CMS integration with Behat (like creating a page), but we're just interested in<span>&nbsp;'</span><em><span class="nf">I fill in "</span><span class="s">To</span><span class="nf">" with "</span><span class="s">the date of 5 days ago</span></em><span class="nf"><em>"</em>'. That's actually a built-in step for <a href="http://mink.behat.org/">Mink</a>, Behat's sidekick for web acceptance testing. It fills out a form field with a value, in our case "the date of 5 days ago". But since we want the actual formatted date (e.g. "2013-12-31", that argument is going through a <a href="http://docs.behat.org/guides/2.definitions.html#step-argument-transformations">Behat Transformation</a>. This handy feature parses all step arguments (mostly quoted stuff in your steps). If any arguments match your transformation rule, it applies the transformation and the new, transformed value is passed into your step function.</span></p>
<pre>&lt;?php
use Behat\Behat\Context\BehatContext;

class MyFeatureContext extends BehatContext {
	
	protected $dateFormat = 'Y-m-d';

	/**
	 * Transforms relative date statements compatible with strtotime().
	 * Example: "date 2 days ago" might return "2013-10-10" if its currently 
	 * the 12th of October 2013. Customize through {@link setDateFormat()}.
	 * 
	 * @Transform /^(?:(the|a)) date of (?.*)$/
	 */
	public function castRelativeToAbsoluteDate($prefix, $val) {
		$timestamp = strtotime($val);
		if(!$timestamp) {
			throw new \InvalidArgumentException(sprintf(
				"Can't resolve '%s' into a valid datetime value",
				$val
			));
		}
		return date($this-&gt;dateFormat, $timestamp);
	}

	public function getDateFormat() {
		return $this-&gt;dateFormat;
	}

	public function setDateFormat($format) {
		$this-&gt;dateFormat = $format;
	}
}
</pre>
<p>PHP's <a href="http://us3.php.net/manual/en/function.strtotime.php">strtotime()</a> is smart enough to handle most natural language relative dates, so we'll leave the hard work to that. The <em>$dateFormat</em> property in our context ensures that the format can be configured based on what locale and your form validation expects. Extending support to transformations of just time or combined date/time values is easy enough with that code. And the best part: This transformation works on all steps, not just the one use case for filling in form fields, greatly reducing step definition duplication.</p>
<p>Last but not least, thanks to our awesome new intern&nbsp;<a href="https://github.com/srizzling">@srizzling</a>&nbsp;for getting this started!</p>